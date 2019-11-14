import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  tiles = [
    {
      title: 'Mayo GICQUEAU',
      iconUrl: 'assets/images/trombi-mayo.jpg',
      details: [
        { icon: 'zmdi-email', text: 'ma.gicqueau@gmail.com' },
        { icon: 'zmdi-whatsapp', text: '+33 6 77 98 50 25' },
        { icon: 'zmdi-facebook', text: 'Mayo Gicqueau', link: 'https://www.facebook.com/mayo.gicqueau' }
      ]
    },
    {
      title: 'Cédric MOUBRI-TOURNES',
      iconUrl: 'assets/images/trombi-cedric.jpg',
      details: [
        { icon: 'zmdi-email', text: 'cedric.moubri-tournes@outlook.fr' },
        { icon: 'zmdi-whatsapp', text: '+33 6 24 26 35 79' },
        { icon: 'zmdi-linkedin', text: 'Mon profil Linkedin', link: 'https://www.linkedin.com/in/c%C3%A9dric-moubri-tournes-b53819112/' },
        { icon: 'zmdi-github', text: 'Dépôts Git', link: 'https://github.com/CedricMT' }
      ]
    }
  ];

  constructor() { }

  ngOnInit() { }

}
