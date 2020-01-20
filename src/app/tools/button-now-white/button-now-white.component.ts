import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-now-white',
  templateUrl: './button-now-white.component.html',
  styleUrls: ['./button-now-white.component.scss']
})
export class ButtonNowWhiteComponent implements  OnInit {
  @Input() btname:string;
  @Input() router:string;

  constructor() { }

  ngOnInit() {
  }

}

