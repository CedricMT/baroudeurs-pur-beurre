import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  title = 'Contact';

  tiles = [
    {
      title: 'Mayo GICQUEAU',
      iconUrl: 'assets/images/camera-paper.svg',
      details: [
        { icon: 'zmdi-email', text: 'ma.gicqueau@gmail.com' },
        { icon: 'zmdi-whatsapp', text: '+336 77 98 50 25' },
        { icon: 'zmdi-facebook', text: 'Mayo Gicqueau' }
      ]
    },
    {
      title: 'Cédric MOUBRI-TOURNES',
      iconUrl: 'assets/images/shoes.svg',
      details: [
        { icon: 'zmdi-email', text: 'cedric.moubri-tournes@outlook.fr' },
        { icon: 'zmdi-whatsapp', text: '+336 24 26 35 79' },
        { icon: 'zmdi-linkedin', text: 'cedric moubri-tournes' },
        { icon: 'zmdi-github', text: 'cmoubritou' }
      ]
    }
  ];

  constructor() { }

  ngOnInit() { }

}
