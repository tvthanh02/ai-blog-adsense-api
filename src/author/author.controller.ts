import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';

@Controller('authors')
export class AuthorController {
 constructor(private readonly authorService: AuthorService) { }

 @Post()
 create(@Body() createAuthorDto: CreateAuthorDto) {
  return this.authorService.create(createAuthorDto);
 }

 @Get()
 findAll() {
  return this.authorService.findAll();
 }

 @Get(':id')
 findOne(@Param('id') id: string) {
  return this.authorService.findOne(id);
 }

 @Put(':id')
 update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
  return this.authorService.update(id, updateAuthorDto);
 }

 @Delete(':id')
 remove(@Param('id') id: string) {
  return this.authorService.remove(id);
 }

 @Get('search')
 search(@Query('q') query: string) {
  return this.authorService.search(query);
 }
}