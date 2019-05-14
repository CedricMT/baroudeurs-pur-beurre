import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Comment } from '@classes/comment';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  baseUrl = 'http://localhost/api';

  comments: Comment[];

  constructor(private http: HttpClient) { }

  getAll(target: string): Observable<Comment[]> {
    return this.http.get(this.baseUrl + '/' + target).pipe(
      map((res) => {
        this.comments = res['data'];
        return this.comments;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
