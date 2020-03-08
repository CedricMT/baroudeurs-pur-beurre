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
        { icon: 'mail', text: 'ma.gicqueau@gmail.com' },
        { icon: 'whatsapp', text: '+33 6 77 98 50 25' },
        { icon: 'facebook', text: 'Mayo Gicqueau', link: 'https://www.facebook.com/mayo.gicqueau' }
      ]
    },
    {
      title: 'Cédric MOUBRI-TOURNES',
      iconUrl: 'assets/images/trombi-cedric.jpg',
      details: [
        { icon: 'mail', text: 'cedric.moubri-tournes@outlook.fr' },
        { icon: 'whatsapp', text: '+33 6 24 26 35 79' },
        { icon: 'linkedin', text: 'Mon profil Linkedin', link: 'https://www.linkedin.com/in/c%C3%A9dric-moubri-tournes-b53819112/' },
        { icon: 'github', text: 'Dépôts Git', link: 'https://github.com/CedricMT' }
      ]
    }
  ];

  constructor() { }

  ngOnInit() { }

}
