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
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      button: {
        label: 'Voir les articles',
        routerLink: '/flow'
      }
    },
    {
      title: 'Le Périple',
      iconUrl: 'assets/images/world_plane.svg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      button: {
        label: 'Découvrir le périple',
        routerLink: '/journey'
      }
    },
    {
      title: 'Où en Sommes Nous ?',
      iconUrl: 'assets/images/destination.svg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      button: {
        label: 'Nous trouver',
        routerLink: '/journey'
      }
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
