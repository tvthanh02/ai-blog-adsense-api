import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentReply } from './comment-reply.entity';
import { CreateCommentDto, CreateCommentReplyDto } from './comment.dto';
import { PostService } from '../post/post.service';
import { AuthorService } from '../author/author.service';

@Injectable()
export class CommentService {
 constructor(
  @InjectRepository(Comment)
  private commentRepository: Repository<Comment>,
  @InjectRepository(CommentReply)
  private commentReplyRepository: Repository<CommentReply>,
  private postService: PostService,
  private authorService: AuthorService,
 ) { }

 async create(createCommentDto: CreateCommentDto): Promise<Comment> {
  const { postId, authorId, content } = createCommentDto;

  const post = await this.postService.findOne(postId);
  if (!post) {
   throw new NotFoundException(`Post with ID ${postId} not found`);
  }

  const author = await this.authorService.findOne(authorId);
  if (!author) {
   throw new NotFoundException(`Author with ID ${authorId} not found`);
  }
  const comment = this.commentRepository.create({
   content,
   post,
   author,
  });

  return this.commentRepository.save(comment);
 }

 findByPost(postId: string): Promise<Comment[]> {
  return this.commentRepository.find({
   where: { post: { id: postId } },
   relations: ['author', 'replies'],
  });
 }

 async createReply(createCommentReplyDto: CreateCommentReplyDto): Promise<CommentReply> {
  const { commentId, authorId, content } = createCommentReplyDto;
  const comment = await this.commentRepository.findOneBy({ id: commentId });
  if (!comment) {
   throw new NotFoundException(`Post with ID ${comment} not found`);
  }
  const author = await this.authorService.findOne(authorId);
  if (!author) {
   throw new NotFoundException(`Author with ID ${authorId} not found`);
  }
  const reply = this.commentReplyRepository.create({ content, comment, author });
  return this.commentReplyRepository.save(reply);
 }
}