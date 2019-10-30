import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Accueil';

  description = ''
    + "Ici vous trouverez le récit de notre aventure comme un carnet de bord ouvert. On espère que vous en prendrez plein les mirettes avec nos photos !"
    // + "Grace à l'itinéraire (qu'on essaye de mettre à jour régulièrement) vous pouvez voir où nous sommes rendu et quelles sont les prochaines étapes... On espère donc que celle ci permettra de belles retrouvailles sur la route pour partager cette aventure ensemble ! Parce que c'est bien le voyage, mais vous nous manquer beaucoup !!" 
    // + "Ps: ici pas de conseils voyageurs, uniquement le partage de notre aventure autour du monde ! Pour faire votre sac, les visas ou les médocs il y a beaucoup d'autres sites qui font du bon boulot hihi... 😉"
    + "Bonne lecture et belle découverte";

  tiles = [
    {
      title: 'Nos Articles',
      iconUrl: 'assets/images/camera-paper.svg',
      text: ['Envie d\'avoir quelques nouvelles des baroudeurs, connaitre les anectodes, les rencontres ou les galères du voyage, c\'est par ici ...'
        + '  Et bien sûr tous les articles sont accompagnés de photos :)'],
      button: {
        label: 'Voir les articles',
        routerLink: '/flow'
      }
    },
    {
      title: 'Le Périple',
      iconUrl: 'assets/images/shoes.svg',
      text: 'Traversée des trois continents de l\'asie à l\'amérique latine, en passant par l\'afrique, pour une durée de 18 mois ou plus si affinité ...',
      button: {
        label: 'Découvrir le périple',
        routerLink: '/journey'
      }
    },
    {
      title: 'Où en Sommes Nous ?',
      iconUrl: 'assets/images/globe.svg',
      text: ['Un peu perdu dans les dates et les destinations ? Pour savoir où nous sommes rendu c\'est par là !'],
      button: {
        label: 'Nous trouver',
        routerLink: '/timeline'
      }
    },
    {
      title: 'Contact',
      iconUrl: 'assets/images/pigeon.svg',
      text: ['Nous contacter'],
      button: {
        label: 'Nous contacter',
        routerLink: '/contact'
      }
    }
  ];

  ngOnInit() { }

}
