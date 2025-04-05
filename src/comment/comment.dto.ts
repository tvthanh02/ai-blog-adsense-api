import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a great article!',
  })
  content: string;

  @ApiProperty({
    description: 'The ID of the post this comment belongs to',
    example: '5f9d5a5b9d9b4b2e1c8b4567',
  })
  postId: string;

  @ApiProperty({
    description: 'The ID of the author of this comment',
    example: '5f9d5a5b9d9b4b2e1c8b4568',
  })
  authorId: string;

  @ApiProperty({
    description: 'The ID of the parent comment (for replies)',
    example: '5f9d5a5b9d9b4b2e1c8b4569',
    required: false,
  })
  parentId?: string;
}

export class UpdateCommentDto {
  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a great article!',
    required: false,
  })
  content?: string;
}

export class CreateCommentReplyDto {
  content: string;
  commentId: string;
  authorId: string;
}
