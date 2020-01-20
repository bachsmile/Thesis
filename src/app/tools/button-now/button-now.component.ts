import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-now',
  templateUrl: './button-now.component.html',
  styleUrls: ['./button-now.component.scss']
})
export class ButtonNowComponent implements OnInit {
  @Input() btname:string;
  @Input() router:string;
  constructor() { }

  ngOnInit() {
  }

}
