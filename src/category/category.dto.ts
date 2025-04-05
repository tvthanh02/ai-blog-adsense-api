import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Technology',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the category',
    example: 'Articles about technology and innovation',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'The slug of the category',
    example: 'technology',
    required: false,
  })
  slug?: string;
}

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Technology',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'The description of the category',
    example: 'Articles about technology and innovation',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'The slug of the category',
    example: 'technology',
    required: false,
  })
  slug?: string;
}
