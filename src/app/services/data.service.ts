import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { DbService } from '@services/db.service';

import { Article } from '@interfaces/article.interface';
import { Comment } from '@interfaces/comment.interface';
import { Location } from '@interfaces/location.interface';
import { Country } from '@interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class DataService {
  private articlesSubject = new Subject<Article[]>();
  private commentsSubject = new Subject<Comment[]>();
  private countriesSubject = new Subject<Country[]>();
  private locationsSubject = new Subject<Location[]>();

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
        console.error('Error while requesting comments', err);
      }
    );
  }

  private requestComments(): Observable<Comment[]> {
    return this.db.getAll<Comment>('comments');
  }

  // Countries
  public getCountriesAsObservable(): Observable<Country[]> {
    return this.countriesSubject.asObservable();
  }

  public async updateCountries(): Promise<void> {
    // Retrieve Countries
    this.requestCountries().subscribe(
      (results: Country[]) => {
        console.log('Requesting countries success: ', results);

        // Update subject
        this.countriesSubject.next(results.reverse());
      },
      (err) => {
        console.error('Error while requesting countries', err);
      }
    );
  }

  private requestCountries(): Observable<Country[]> {
    return this.db.getAll<Country>('countries');
  }

  // Locations
  public getLocationsAsObservable(): Observable<Location[]> {
    return this.locationsSubject.asObservable();
  }

  public async updateLocations(): Promise<void> {
    // Retrieve locations
    this.requestLocations().subscribe(
      (results: Location[]) => {
        console.log('Requesting locations success: ', results);

        // Update subject
        this.locationsSubject.next(results.reverse());
      },
      (err) => {
        console.error('Error while requesting locations', err);
      }
    );
  }

  private requestLocations(): Observable<Location[]> {
    return this.db.getAll<Location>('locations');
  }
}
