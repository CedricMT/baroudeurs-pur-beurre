import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  links = {
    github: 'https://github.com/CedricMT',
    linkedin: 'https://www.linkedin.com/in/c%C3%A9dric-moubri-tournes-b53819112/'
  }
  constructor() { }

  ngOnInit() {
  }

}
