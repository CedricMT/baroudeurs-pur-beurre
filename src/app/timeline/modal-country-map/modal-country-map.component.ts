import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-country-map',
  templateUrl: './modal-country-map.component.html',
  styleUrls: ['./modal-country-map.component.scss']
})
export class ModalCountryMapComponent {

  @Input() country;

  public flagRootPath = 'assets/images/flags/';

  constructor(public activeModal: NgbActiveModal) { }

}
