import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';

@Controller('posts')
export class PostController {
 constructor(private readonly postService: PostService) { }

 @Post()
 create(@Body() createPostDto: CreatePostDto) {
  return this.postService.create(createPostDto);
 }

 @Get()
 findAll() {
  return this.postService.findAll();
 }

 @Get(':id')
 findOne(@Param('id') id: string) {
  return this.postService.findOne(id);
 }

 @Put(':id')
 update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  return this.postService.update(id, updatePostDto);
 }

 @Delete(':id')
 remove(@Param('id') id: string) {
  return this.postService.remove(id);
 }

 @Get('search/category/:categoryId')
 searchByCategory(@Param('categoryId') categoryId: string) {
  return this.postService.searchByCategory(categoryId);
 }
}