import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() label: string;
  @Input() height: string = '1.25em';
  @Input() width: string = '1.25em';

  constructor() { }

}
