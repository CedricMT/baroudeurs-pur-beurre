import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { DbService } from '@services/db.service';

import { Article } from '@interfaces/article.interface';
import { Comment } from '@interfaces/comment.interface';

@Injectable({ providedIn: 'root' })
export class DataService {
  private articlesSubject = new Subject<Article[]>();
  private commentsSubject = new Subject<Comment[]>();

  constructor(private db: DbService) { }

  // Articles
  public getArticlesAsObservable(): Observable<Article[]> {
    return this.articlesSubject.asObservable();
  }

  public async updateArticles(): Promise<void> {
    // Retrieve articles
    this.requestArticles().subscribe(
      (results: Article[]) => {
        console.log('Requesting articles success: ', results);
        
        // Update subject
        this.articlesSubject.next(results.reverse());
      },
      (err) => {
        console.error('Error while requesting articles', err);
      }
    );
  }

  private requestArticles(): Observable<Article[]> {
    return this.db.getAll<Article>('articles');
  }

  // Comments
  public getCommentsAsObservable(): Observable<Comment[]> {
    return this.commentsSubject.asObservable();
  }

  public async updateComments(): Promise<void> {
    // Retrieve comments
    this.requestComments().subscribe(
      (results: Comment[]) => {
        console.log('Requesting comments success: ', results);
        
        // Update subject
        this.commentsSubject.next(results.reverse());
      },
      (err) => {
        console.error('Error while requesting comment', err);
      }
    );
  }

  private requestComments(): Observable<Comment[]> {
    return this.db.getAll<Comment>('comments');
  }
}
