import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-carousel',
  templateUrl: './modal-carousel.component.html',
  styleUrls: ['./modal-carousel.component.scss']
})
export class ModalCarouselComponent implements OnInit {

  @Input() title: string;
  @Input() imagesPath: string[];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() { }

}
