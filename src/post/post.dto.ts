import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'How to Use Swagger in NestJS',
  })
  title: string;

  @ApiProperty({
    description: 'The content of the post',
    example: 'In this article, we will learn how to document APIs using Swagger in NestJS...',
  })
  content: string;

  @ApiProperty({
    description: 'The ID of the author of this post',
    example: '5f9d5a5b9d9b4b2e1c8b4568',
  })
  authorId: string;

  @ApiProperty({
    description: 'The IDs of categories this post belongs to',
    example: '5f9d5a5b9d9b4b2e1c8b4567',
    type: String,
  })
  categoryId: string;

  @ApiProperty({
    description: 'The slug of the post',
    example: 'how-to-use-swagger-in-nestjs',
    required: false,
  })
  slug?: string;

  @ApiProperty({
    description: 'Tags for the post',
    example: ['nestjs', 'swagger', 'api'],
    type: [String],
    required: false,
  })
  tags?: string[];

  @ApiProperty({
    description: 'Images for the post',
    example: ['https://example.com/images/swagger-nestjs.jpg'],
    type: [String],
    required: false,
  })
  imageUrls?: string[];

  @ApiProperty({
    description: 'Thumbnail image URL',
    example: 'https://example.com/images/swagger-nestjs.jpg',
  })
  thumbnail: string;
}

export class UpdatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'How to Use Swagger in NestJS',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'The content of the post',
    example: 'In this article, we will learn how to document APIs using Swagger in NestJS...',
    required: false,
  })
  content?: string;

  @ApiProperty({
    description: 'The ID of the author of this post',
    example: '5f9d5a5b9d9b4b2e1c8b4568',
    required: false,
  })
  authorId?: string;

  @ApiProperty({
    description: 'The IDs of categories this post belongs to',
    example: '5f9d5a5b9d9b4b2e1c8b4567',
    type: String,
    required: false,
  })
  categoryId?: string;

  @ApiProperty({
    description: 'The slug of the post',
    example: 'how-to-use-swagger-in-nestjs',
    required: false,
  })
  slug?: string;

  @ApiProperty({
    description: 'Tags for the post',
    example: ['nestjs', 'swagger', 'api'],
    type: [String],
    required: false,
  })
  tags?: string[];

  @ApiProperty({
    description: 'Images for the post',
    example: ['https://example.com/images/swagger-nestjs.jpg'],
    type: [String],
    required: false,
  })
  imageUrls?: string[];

  @ApiProperty({
    description: 'Thumbnail image URL',
    example: 'https://example.com/images/swagger-nestjs.jpg',
    required: false,
  })
  thumbnail?: string;
}
