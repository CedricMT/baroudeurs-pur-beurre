import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  events = [
    {
      date: '06/06/2019',
      state: 'past',
      duration: '1 mois',
      country: 'Indonésie',
      flagUrl: 'assets/images/flags/id.svg',
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
      date: '06/08/2019',
      state: 'future',
      duration: '1 mois et demi',
      country: 'Japon',
      flagUrl: 'assets/images/flags/jp.svg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nunc lorem, sagittis vitae mauris porttitor, efficitur'
        + ' fermentum ante. Quisque velit eros, ultricies sit amet eros quis, porta placerat mauris.'
    },
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
      date: '18/10/2019',
      state: 'future',
      duration: '1 mois',
      country: 'Thailande',
      flagUrl: 'assets/images/flags/th.svg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nunc lorem, sagittis vitae mauris porttitor, efficitur'
        + ' fermentum ante. Quisque velit eros, ultricies sit amet eros quis, porta placerat mauris.'
    },
    {
      date: '18/11/2019',
      state: 'future',
      duration: '1 mois',
      country: 'Vietnam',
      flagUrl: 'assets/images/flags/vn.svg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nunc lorem, sagittis vitae mauris porttitor, efficitur'
        + ' fermentum ante. Quisque velit eros, ultricies sit amet eros quis, porta placerat mauris.'
    },
    {
      date: '18/12/2019',
      state: 'future',
      duration: '1 mois',
      country: 'Laos',
      flagUrl: 'assets/images/flags/la.svg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nunc lorem, sagittis vitae mauris porttitor, efficitur'
        + ' fermentum ante. Quisque velit eros, ultricies sit amet eros quis, porta placerat mauris.'
    },
    {
      date: '18/01/2019',
      state: 'future',
      duration: '1 mois et demi',
      country: 'Inde',
      flagUrl: 'assets/images/flags/in.svg',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nunc lorem, sagittis vitae mauris porttitor, efficitur'
        + ' fermentum ante. Quisque velit eros, ultricies sit amet eros quis, porta placerat mauris.'
    }
  ];

  public isFutureLocationsCollapsed = true;
  public collapseFutureLocationIndex = 0;

  constructor() { }

  ngOnInit() {
    this.collapseFutureLocationIndex = this.events.findIndex(event => event.state === 'future');
  }
}
