import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(author);
  }

  findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  findOne(id: string): Promise<Author | null> {
    return this.authorRepository.findOneBy({ id });
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author | null> {
    await this.authorRepository.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.authorRepository.delete(id);
  }

  search(query: string): Promise<Author[]> {
    return this.authorRepository
      .createQueryBuilder('author')
      .where('author.name ILIKE :query OR author.email ILIKE :query', { query: `%${query}%` })
      .getMany();
  }
}
