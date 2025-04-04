import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Author } from '../author/author.entity';
import { Category } from '../category/category.entity';
import { PostImage } from './post-image.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Post {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 title: string;

 @Column('jsonb')
 content: string;

 @Column()
 thumbnail: string;

 @Column()
 description?: string;

 @ManyToOne(() => Author, (author) => author.posts)
 author: Author;

 @ManyToOne(() => Category, (category) => category.posts)
 category: Category;

 @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
 created_at: Date;

 @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
 updated_at: Date;

 @OneToMany(() => PostImage, (image) => image.post)
 images: PostImage[];

 @OneToMany(() => Comment, (comment) => comment.post)
 comments: Comment[];
}