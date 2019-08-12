import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Accueil';

  tiles = [
    {
      title: 'Nos Articles',
      iconUrl: 'assets/images/camera.svg',
      text: 'Envie d\'avoir quelques nouvelles des baroudeurs, connaitre les anectodes, les rencontres ou les galères du voyage, c\'est par ici ...'
        + '  Et bien sûr tous les articles sont accompagnés de photos :)',
      button: {
        label: 'Voir les articles',
        routerLink: '/flow'
      }
    },
    {
      title: 'Le Périple',
      iconUrl: 'assets/images/world_plane.svg',
      text: 'Traversée des trois continents de l\'asie à l\'amérique latine, en passant par l\'afrique, pour une durée de 18 mois ou plus si affinité ...',
      button: {
        label: 'Découvrir le périple',
        routerLink: '/journey'
      }
    },
    {
      title: 'Où en Sommes Nous ?',
      iconUrl: 'assets/images/destination.svg',
      text: 'Un peu perdu dans les dates et les destinations ? Pour savoir où nous sommes rendu c\'est par là !',
      button: {
        label: 'Nous trouver',
        routerLink: '/timeline'
      }
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
