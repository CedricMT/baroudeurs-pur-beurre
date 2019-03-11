import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  @Input() title: string;
  @Input() number: number;
  @Input() text: string;
  @Input() images: Array<string>;

  constructor() { }

}
