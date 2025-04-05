import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './comment.dto';
import { Comment } from './comment.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateCommentDto })
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  // @Get()
  // @ApiOperation({ summary: 'Get all comments' })
  // @ApiResponse({ status: 200, description: 'Return all comments.' })
  // async findAll(): Promise<Comment[]> {
  //   return this.commentService.findAll();
  // }

  @Get('post/:postId')
  @ApiOperation({ summary: 'Get comments by post ID' })
  @ApiParam({ name: 'postId', description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Return comments for the specified post.' })
  async findByPost(@Param('postId') postId: string): Promise<Comment[]> {
    return this.commentService.findByPost(postId);
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get comment by id' })
  // @ApiParam({ name: 'id', description: 'Comment ID' })
  // @ApiResponse({ status: 200, description: 'Return the comment.' })
  // @ApiResponse({ status: 404, description: 'Comment not found.' })
  // async findOne(@Param('id') id: string): Promise<Comment> {
  //   return this.commentService.findOne(id);
  // }

  // @Put(':id')
  // @ApiOperation({ summary: 'Update a comment' })
  // @ApiParam({ name: 'id', description: 'Comment ID' })
  // @ApiBody({ type: UpdateCommentDto })
  // @ApiResponse({ status: 200, description: 'The comment has been successfully updated.' })
  // @ApiResponse({ status: 404, description: 'Comment not found.' })
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateCommentDto: UpdateCommentDto,
  // ): Promise<Comment> {
  //   return this.commentService.update(id, updateCommentDto);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a comment' })
  // @ApiParam({ name: 'id', description: 'Comment ID' })
  // @ApiResponse({ status: 200, description: 'The comment has been successfully deleted.' })
  // @ApiResponse({ status: 404, description: 'Comment not found.' })
  // async remove(@Param('id') id: string): Promise<void> {
  //   return this.commentService.remove(id);
  // }
}
