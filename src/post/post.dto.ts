export class CreatePostDto {
 title: string;
 content: string;
 authorId: string;
 categoryId: string;
 imageUrls?: string[];
}

export class UpdatePostDto {
 title?: string;
 content?: string;
 categoryId?: string;
}