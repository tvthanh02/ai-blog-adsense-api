import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Controller('categories')
export class CategoryController {
 constructor(private readonly categoryService: CategoryService) { }

 @Post()
 create(@Body() createCategoryDto: CreateCategoryDto) {
  return this.categoryService.create(createCategoryDto);
 }

 @Get()
 findAll() {
  return this.categoryService.findAll();
 }

 @Get(':id')
 findOne(@Param('id') id: string) {
  return this.categoryService.findOne(id);
 }

 @Put(':id')
 update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  return this.categoryService.update(id, updateCategoryDto);
 }

 @Delete(':id')
 remove(@Param('id') id: string) {
  return this.categoryService.remove(id);
 }

 @Get('search')
 search(@Query('q') query: string) {
  return this.categoryService.search(query);
 }
}