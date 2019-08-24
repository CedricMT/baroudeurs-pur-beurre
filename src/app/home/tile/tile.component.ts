import { Component, OnInit, Input } from '@angular/core';

interface TileButtonProperties {
  label: string;
  routerLink: string;
}

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;
  @Input() iconUrl: string;
  @Input() button: TileButtonProperties;

  constructor() { }

  ngOnInit() { }

}
