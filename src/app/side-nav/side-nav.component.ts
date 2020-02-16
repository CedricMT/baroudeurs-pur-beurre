import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() articles: Array<any>;

  constructor() { }

  public scrollToTop(event) {
    event.stopPropagation();
    $('html, body').animate({ scrollTop: '0px' }, 300);
  }
}
