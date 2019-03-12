import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;
  @Input() iconUrl: string;
  @Input() button: string;

  constructor() { }

  ngOnInit() {
    console.log(this.title);
  }

}
