import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fotter',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FotterComponent implements OnInit {
  copyrightYear: number = (new Date(Date.now())).getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
