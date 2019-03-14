import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
