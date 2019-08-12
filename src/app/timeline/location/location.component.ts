import { Component, OnInit, Input } from '@angular/core';

import { Location } from '@interfaces/location.interface';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  @Input() location: Location;
  @Input() direction: string;

  public flagRootPath = 'assets/images/flags/';

  constructor() { }

  ngOnInit() {
  }

}
