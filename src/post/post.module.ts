import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostImage } from './post-image.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthorModule } from '../author/author.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostImage]), AuthorModule, CategoryModule],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
