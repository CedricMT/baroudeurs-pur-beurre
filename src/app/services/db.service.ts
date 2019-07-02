import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Comment } from '@classes/comment';
import { Article } from '@interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  apiUrl = environment.apiUrl;

  comments: Comment[];

  constructor(private http: HttpClient) { }

  public getAll<T>(target: string): Observable<T[]> {
    return this.http.get<T>(this.apiUrl + target).pipe(
      map((res) => res['data']),
      catchError(this.handleError));
  }

  public addComment(comment: Comment) {
    return this.http.post<Comment>(this.apiUrl + 'addComment', comment).pipe(
      map((res) => res['response']),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);

    // Return an observable with a user friendly message
    return throwError('An error occured in db service.');
  }
}
