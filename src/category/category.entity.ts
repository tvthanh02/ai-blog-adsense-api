import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity()
export class Category {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column({ unique: true })
 name: string;

 @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
 created_at: Date;

 @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
 updated_at: Date;

 @OneToMany(() => Post, (post) => post.category)
 posts: Post[];
}