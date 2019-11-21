import { Component } from '@angular/core';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent {

  title = 'Voyage d\'Est en Ouest';
  description = 'L\'itinéraire ne peut pas être parfaitement callé à l\'avance, parce que c\'est aussi ce qui fait le charme du voyage il nous semble.'
    + ' On peut tout de même vous dire qu’on commence par l’Asie pour huit mois environ, histoire de prendre notre temps.'
    + ' On pense finir la traversée de l’Asie avec l’Inde, au mois de mars 2020. Nous arriverons ensuite en Afrique où l’on pense rester trois ou quatre mois, entre la Tanzanie à la Namibie.'
    + ' Puis passage par la Réunion, pour une durée indéterminée encore, puisque cette étape dépendra surtout de notre portefeuille et le besoin ou non de rester travailler un peu sur l’île… Ce grand voyage prendra fin en Amérique latine à partir de septembre 2020, du sud de l\'Argentine jusqu\'au Mexique, en passant par Cuba et la Jamaïque.'
    + ' Nous n\’avons pas encore de date retour mais début 2021 nous semble un bon compromis.';

  constructor() { }

}
