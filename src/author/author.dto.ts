import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({
    description: 'The name of the author',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email of the author',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The bio of the author',
    example: 'A professional writer with 10 years of experience',
    required: false,
  })
  bio?: string;
}

export class UpdateAuthorDto {
  @ApiProperty({
    description: 'The name of the author',
    example: 'John Doe',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'The email of the author',
    example: 'john.doe@example.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'The bio of the author',
    example: 'A professional writer with 10 years of experience',
    required: false,
  })
  bio?: string;

  @ApiProperty({
    description: 'The avatar of the author',
    example:
      'https://res.cloudinary.com/dwirhhhqt/image/upload/v1/uploads/ai-generating-image-from-text-concept-deepai?_a=BAMAJaWO0',
    required: false,
  })
  avatar?: string;
}
