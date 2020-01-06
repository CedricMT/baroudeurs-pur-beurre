import { Comment } from './comment.interface';

export interface Article {
    id: number,
    title: string,
    text: string,
    images: string,
    imgNb: string,
    imgDirLabel: string,
    comments: Comment[];
    countryId: number,
    countryName: string,
    date: string
}