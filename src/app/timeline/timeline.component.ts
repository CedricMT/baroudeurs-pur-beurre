import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

  // https://www.bootdey.com/snippets/view/bs4-clear-timeline
  events = [
    {
      date: '25/12/2017',
      duration: 'Maintenant',
      country: 'France',
      icon: 'airplane',
      flagUrl: 'assets/images/flags/fr.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nunc lorem, sagittis vitae mauris porttitor, efficitur'
        + ' fermentum ante. Quisque velit eros, ultricies sit amet eros quis, porta placerat mauris.'
    },
    {
      date: '25/12/2017',
      duration: '3 semaines',
      country: 'Japon',
      icon: 'boat',
      flagUrl: 'assets/images/flags/jp.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nunc lorem, sagittis vitae mauris porttitor, efficitur'
        + ' fermentum ante. Quisque velit eros, ultricies sit amet eros quis, porta placerat mauris.'
    },
    {
      date: '25/12/2017',
      duration: '1 mois',
      country: 'Chine',
      icon: 'bus',
      flagUrl: 'assets/images/flags/cn.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nunc lorem, sagittis vitae mauris porttitor, efficitur'
        + ' fermentum ante. Quisque velit eros, ultricies sit amet eros quis, porta placerat mauris.'
    },
    {
      date: '25/12/2017',
      duration: '1 mois',
      country: 'Inde',
      icon: 'railway',
      flagUrl: 'assets/images/flags/in.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nunc lorem, sagittis vitae mauris porttitor, efficitur'
        + ' fermentum ante. Quisque velit eros, ultricies sit amet eros quis, porta placerat mauris.'
    }
  ];

  constructor() { }


}
