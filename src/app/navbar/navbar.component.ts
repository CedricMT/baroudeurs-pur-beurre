import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  title = 'Baroudeurs Pur Beurre';
  navLinks = [
    { label: 'Accueil', routerLink: 'home' },
    { label: 'Nos Articles', routerLink: 'flow' },
    { label: 'Le Périple', routerLink: 'journey' },
    { label: 'Où en Sommes Nous ?', routerLink: 'timeline' }
  ];

  constructor() { }

  isHome() {
    return window.location.pathname === '/home';
  }

}
