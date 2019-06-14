import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent implements OnInit {

  title = 'Voyage d\'Est en Ouest';
  description = 'Départ en juin 2019 en Indonésie, pour une arrivée au Mexique prévue en décembre 2020 ... L\'itinéraire ne peut pas être parfaitement callé à l\'avance, parce que c\'est aussi ce qui fait le charme du voyage il nous semble ! Vous pouvez tout de même suivre le trajet de l\'avion pour avoir une idée approximative de notre parcours ... ';

  constructor() { }

  ngOnInit() {
  }

}
