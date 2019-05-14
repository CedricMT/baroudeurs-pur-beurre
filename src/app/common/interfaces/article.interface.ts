import { Comment } from './comment.interface';

export interface Article {
    id: number,
    title: string,
    text: string,
    images: string,
    comments: Comment[];
}