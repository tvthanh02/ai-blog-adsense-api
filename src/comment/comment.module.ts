import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentReply } from './comment-reply.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PostModule } from '../post/post.module';
import { AuthorModule } from '../author/author.module';

@Module({
 imports: [
  TypeOrmModule.forFeature([Comment, CommentReply]),
  PostModule,
  AuthorModule,
 ],
 providers: [CommentService],
 controllers: [CommentController],
})
export class CommentModule { }