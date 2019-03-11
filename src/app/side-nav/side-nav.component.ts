import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// TODO: implement rooter scroller
// tuto link https://medium.com/lacolaco-blog/introduce-router-scroller-in-angular-v6-1-ef34278461e9 

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  @Input() articles: Array<string>;

  constructor(private router: Router) { }

  isActive(currentRoute: any[], exact = true): boolean {
    return this.router.isActive(this.router.createUrlTree(currentRoute), exact);
  }
}
