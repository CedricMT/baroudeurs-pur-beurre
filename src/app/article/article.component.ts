import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DbService } from '@services/db.service';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() articleId: number;
  @Input() title: string;
  @Input() number: number;
  @Input() text: string;
  @Input() imgNb: number;
  @Input() imgDirLabel: string;
  @Input() comments: Array<string>;

  isCommentsCollapsed = true;
  isNewCommentCollapsed = true;
  isOverviewMode = true;

  imagesPath: string[] = [];

  commentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private db: DbService) { }

  ngOnInit(): void {
    // Create images path array
    this.imagesPath = Array.from({ length: this.imgNb }, (v, i) => this.imgDirLabel + '/' + (i + 1) + '.jpg');
    console.log(this.imagesPath);

    this.commentForm = this.fb.group({
      author: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  addComment() {
    const comment = Object.assign({ articleId: this.articleId }, this.commentForm.value);
    this.db.addComment(comment).subscribe(
      (results: any) => {
        console.log(results);
        this.data.updateComments();
      },
      (err) => {
        console.error('Error while adding comments', err);
      }
    );

    // Collapse new comment form
    this.isNewCommentCollapsed = true;
  }
}
