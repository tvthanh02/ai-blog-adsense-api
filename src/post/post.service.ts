import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Post } from './post.entity';
import { PostImage } from './post-image.entity';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { AuthorService } from '../author/author.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(PostImage)
    private postImageRepository: Repository<PostImage>,
    private authorService: AuthorService,
    private categoryService: CategoryService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post | null> {
    const { authorId, categoryId, imageUrls, ...postData } = createPostDto;
    const author = await this.authorService.findOne(authorId);
    if (!author) {
      throw new NotFoundException(`Post with ID ${author} not found`);
    }
    const category = await this.categoryService.findOne(categoryId);
    if (!category) {
      throw new NotFoundException(`Post with ID ${category} not found`);
    }
    const post = this.postRepository.create({
      ...postData,
      author,
      category,
    });
    const savedPost = await this.postRepository.save(post);

    if (imageUrls && imageUrls.length > 0) {
      const images = imageUrls.map(url =>
        this.postImageRepository.create({ image_url: url, post: savedPost }),
      );
      await this.postImageRepository.save(images);
    }

    return this.findOne(savedPost.id);
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['author', 'category', 'images', 'comments'] });
  }

  findOne(id: string): Promise<Post | null> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['author', 'category', 'images', 'comments'],
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post | null> {
    await this.postRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.postImageRepository.delete({ post: { id } });
    await this.postRepository.delete(id);
  }

  searchByCategory(categoryId: string): Promise<Post[]> {
    return this.postRepository.find({
      where: { category: { id: categoryId } },
      relations: ['author', 'category', 'images', 'comments'],
    });
  }

  async search(query: string): Promise<Post[]> {
    return this.postRepository.find({
      where: [{ title: Like(`%${query}%`) }, { content: Like(`%${query}%`) }],
      relations: ['author', 'category', 'images', 'comments'],
    });
  }

  async findByCategory(categoryId: string): Promise<Post[]> {
    return this.searchByCategory(categoryId);
  }

  async findByAuthor(authorId: string): Promise<Post[]> {
    return this.postRepository.find({
      where: { author: { id: authorId } },
      relations: ['author', 'category', 'images', 'comments'],
    });
  }
}
