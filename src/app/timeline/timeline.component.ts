import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

  events = [
    {
      date: '18/09/2019',
      state: 'future',
      duration: '1 mois',
      country: 'Chine',
      flagUrl: 'assets/images/flags/cn.svg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nunc lorem, sagittis vitae mauris porttitor, efficitur'
        + ' fermentum ante. Quisque velit eros, ultricies sit amet eros quis, porta placerat mauris.'
    },
    {
      date: '06/08/2019',
      state: 'future',
      duration: '1 mois et demi',
      country: 'Japon',
      flagUrl: 'assets/images/flags/jp.svg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nunc lorem, sagittis vitae mauris porttitor, efficitur'
        + ' fermentum ante. Quisque velit eros, ultricies sit amet eros quis, porta placerat mauris.'
    },
    {
      date: '06/07/2019',
      state: 'current',
      duration: '1 mois',
      country: 'Cambodge',
      flagUrl: 'assets/images/flags/kh.svg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nunc lorem, sagittis vitae mauris porttitor, efficitur'
        + ' fermentum ante. Quisque velit eros, ultricies sit amet eros quis, porta placerat mauris.'
    },
    {
      date: '06/06/2019',
      state: 'past',
      duration: '1 mois',
      country: 'Indonésie',
      flagUrl: 'assets/images/flags/id.svg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nunc lorem, sagittis vitae mauris porttitor, efficitur'
        + ' fermentum ante. Quisque velit eros, ultricies sit amet eros quis, porta placerat mauris.'
    }
  ];

  constructor() { }

}
