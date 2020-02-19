import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-message',
  templateUrl: './loading-message.component.html',
  styleUrls: ['./loading-message.component.scss']
})
export class LoadingMessageComponent {

  @Input() text: string;

  constructor() { }
}
