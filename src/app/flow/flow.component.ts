import { Component, OnInit } from '@angular/core';

import { Article } from '@interfaces/article.interface';
import { Comment } from '@interfaces/comment.interface';

import { DbService } from '@services/db.service';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {

  title = 'Nos Articles';

  articles: Article[] = [];
  articlesList: string[] = [];
  comments: Comment[] = [];

  constructor(private db: DbService) { }

  ngOnInit() {
    this.getArticles();
    this.getComments();
  }

  getComments(): void {
    this.db.getAll('comments').subscribe(
      (comments: Comment[]) => {
        console.log('Requesting comments success: ', comments);

        // Update articles related comments from result
        comments.forEach((comment: Comment) => {
          const index = this.articles.findIndex((article: Article) => article.id === comment.id);
          this.articles[index].comments.push(comment);
        });

      },
      (err) => {
        console.error('Error while requesting comments', err);
      }
    );
  }

  getArticles(): void {
    this.db.getAll('articles').subscribe(
      (results: any[]) => {
        console.log('Requesting articles success: ', results);

        // Update articles array with result
        this.articles = results.map(result => Object.assign(result, { comments: [] }));
        this.articlesList = this.articles.map(article => article.title);
      },
      (err) => {
        console.error('Error while requesting comments', err);
      }
    );
  }
}
