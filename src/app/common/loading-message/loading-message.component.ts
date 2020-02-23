import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loading-message',
  templateUrl: './loading-message.component.html',
  styleUrls: ['./loading-message.component.scss']
})
export class LoadingMessageComponent implements OnInit {
  @Input() text: string;
  @Input() color: string;

  textColor: string = '';
  acceptedColors = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark'
  ];

  constructor() { }

  ngOnInit(): void {
    // Check if color is accepted by bootstrap spinner
    const colorAccepted = this.acceptedColors.find((acceptedColor: string) => {
      return acceptedColor === this.color;
    })

    // Apply color to spinner
    if (this.color && colorAccepted) {
      this.textColor = 'text-' + this.color;
    }
  }
}