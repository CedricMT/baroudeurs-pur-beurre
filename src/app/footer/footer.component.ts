import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  links = [
    { iconLabel: 'zmdi-whatsapp', routerLink: 'contact' },
    { iconLabel: 'zmdi-email', routerLink: 'contact' },
    { iconLabel: 'zmdi-linkedin', href: 'https://www.linkedin.com/in/c%C3%A9dric-moubri-tournes-b53819112/' },
    { iconLabel: 'zmdi-github', href: 'https://github.com/CedricMT' }
  ];

  navLinks = [
    { label: 'Accueil', routerLink: 'home' },
    { label: 'Nos Articles', routerLink: 'flow' },
    { label: 'Le Périple', routerLink: 'journey' },
    { label: 'Pays visités', routerLink: 'timeline' },
    { label: 'Contact', routerLink: 'contact' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
