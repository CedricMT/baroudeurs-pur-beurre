import { Component, OnInit } from '@angular/core';

import { Article } from '@interfaces/article.interface';
import { Comment } from '@interfaces/comment.interface';

import { DataService } from '@services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {

  title = 'Nos Articles';

  articlesSubscription: Subscription;
  articles: Article[] = [];
  articlesTitleList: string[] = [];

  commentsSubscription: Subscription;
  comments: Comment[] = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    // Subscribe to data
    this.subscribeArticles();
    this.subscribeComments();

    // Update articles and associated comments
    this.data.updateArticles();
  }

  private subscribeArticles(): void {
    this.articlesSubscription = this.data.getArticlesAsObservable().subscribe((articles: Article[]) => {
      // Update articles and title list
      this.articles = articles;
      this.articlesTitleList = this.articles.map(article => article.title);

      // Update comments
      this.data.updateComments();
    });
  }

  private resetArticleComments(): void {
    this.articles.forEach((article: Article) => article.comments = []);
  }

  private subscribeComments(): void {
    this.commentsSubscription = this.data.getCommentsAsObservable().subscribe((comments: Comment[]) => {
      this.insertCommentsArticles(comments);
    });
  }

  private insertCommentsArticles(comments: Comment[]) {
    // Reset all article comments before update
    this.resetArticleComments();

    // Update article comments
    comments.forEach((comment: Comment) => {
      const article = this.articles.find((article: Article) => article.id === comment.articleId);
      if (article) {
        article.comments.push(comment);
      } else {
        console.error('Unknown article with id: ', comment.articleId, ', cannot insert comment: ', comment);
      }
    })
  };

  // Unsubscribe to ensure no memory leaks
  ngOnDestroy() {
    this.articlesSubscription.unsubscribe();
  }
}
