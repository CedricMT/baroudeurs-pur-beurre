import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-carousel',
  templateUrl: './modal-carousel.component.html',
  styleUrls: ['./modal-carousel.component.scss']
})
export class ModalCarouselComponent {

  @Input() title: string;
  @Input() imagesPath: string[];

  constructor(public activeModal: NgbActiveModal) { }

  // Hide spinner when picture is loaded
  ngAfterViewInit() {
    $(".picture").on('load', function () {
      $(this).siblings('.spinner').hide();
    })
  }
}
