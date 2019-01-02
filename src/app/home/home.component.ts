import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles = [
    {
      title: 'Premier Article',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sagittis erat eu lacus maximus, sit amet'
        + 'scelerisque neque eleifend. Suspendisse potenti. Sed gravida accumsan sapien sit amet dignissim. Suspendisse'
        + 'metus metus, interdum vel libero quis, egestas pharetra lacus. Nam fermentum sem quis mauris tincidunt, necv'
        + 'ulputate purus pretium. Praesent lacinia nisi nec tellus luctus consectetur. Cras eu enim ac tortor porttito'
        + 'r pulvinar at a eros. Donec neque risus, convallis ac ex sed, ultricies iaculis quam. Praesent dignissim ant'
        + 'e nisl, nec posuere mi dictum in. In non purus et est bibendum vehicula in et justo. Donec tempor justo eu n'
        + 'unc venenatis, sit amet lacinia ante pulvinar. Fusce tincidunt neque congue quam placerat, sit amet laoreet '
        + 'nibh euismod.',
      images: [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`),
    },
    {
      title: 'Deuxième Article',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sagittis erat eu lacus maximus, sit amet'
        + 'scelerisque neque eleifend. Suspendisse potenti. Sed gravida accumsan sapien sit amet dignissim. Suspendisse'
        + 'metus metus, interdum vel libero quis, egestas pharetra lacus. Nam fermentum sem quis mauris tincidunt, necv'
        + 'ulputate purus pretium. Praesent lacinia nisi nec tellus luctus consectetur. Cras eu enim ac tortor porttito'
        + 'r pulvinar at a eros. Donec neque risus, convallis ac ex sed, ultricies iaculis quam. Praesent dignissim ant'
        + 'e nisl, nec posuere mi dictum in. In non purus et est bibendum vehicula in et justo. Donec tempor justo eu n'
        + 'unc venenatis, sit amet lacinia ante pulvinar. Fusce tincidunt neque congue quam placerat, sit amet laoreet '
        + 'nibh euismod.',
      images: [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`),
    },
    {
      title: 'Troisième Article',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sagittis erat eu lacus maximus, sit amet'
        + 'scelerisque neque eleifend. Suspendisse potenti. Sed gravida accumsan sapien sit amet dignissim. Suspendisse'
        + 'metus metus, interdum vel libero quis, egestas pharetra lacus. Nam fermentum sem quis mauris tincidunt, necv'
        + 'ulputate purus pretium. Praesent lacinia nisi nec tellus luctus consectetur. Cras eu enim ac tortor porttito'
        + 'r pulvinar at a eros. Donec neque risus, convallis ac ex sed, ultricies iaculis quam. Praesent dignissim ant'
        + 'e nisl, nec posuere mi dictum in. In non purus et est bibendum vehicula in et justo. Donec tempor justo eu n'
        + 'unc venenatis, sit amet lacinia ante pulvinar. Fusce tincidunt neque congue quam placerat, sit amet laoreet '
        + 'nibh euismod.',
      images: [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`),
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
