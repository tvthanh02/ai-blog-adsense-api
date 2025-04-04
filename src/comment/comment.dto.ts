export class CreateCommentDto {
 content: string;
 postId: string;
 authorId: string;
}

export class CreateCommentReplyDto {
 content: string;
 commentId: string;
 authorId: string;
}