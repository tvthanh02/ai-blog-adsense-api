import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Comment } from './comment.entity';
import { Author } from '../author/author.entity';

@Entity()
export class CommentReply {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column('text')
 content: string;

 @ManyToOne(() => Comment, (comment) => comment.replies)
 comment: Comment;

 @ManyToOne(() => Author, (author) => author.replies)
 author: Author;

 @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
 created_at: Date;

 @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
 updated_at: Date;
}