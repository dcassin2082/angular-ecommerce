import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  year: number;

  ngOnInit(): void {
    var dt = new Date();
    this.year = dt.getFullYear();
  }

}
