import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, CreateCommentReplyDto } from './comment.dto';

@Controller('comments')
export class CommentController {
 constructor(private readonly commentService: CommentService) { }

 @Post()
 create(@Body() createCommentDto: CreateCommentDto) {
  return this.commentService.create(createCommentDto);
 }

 @Get('post/:postId')
 findByPost(@Param('postId') postId: string) {
  return this.commentService.findByPost(postId);
 }

 @Post('reply')
 createReply(@Body() createCommentReplyDto: CreateCommentReplyDto) {
  return this.commentService.createReply(createCommentReplyDto);
 }
}