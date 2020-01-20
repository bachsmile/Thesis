
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-add-brand',
  templateUrl: './form-add-brand.component.html',
  styleUrls: ['./form-add-brand.component.scss']
})
export class FormAddBrandComponent implements OnInit {
  @Input() Link1: string;
  @Input() Link2: string;
  @Input() Link3: string;
  @Input() img: string;
  @Input() title: string;
  @Input() bt1:string;
  @Input() router1:string;
  @Input() router2:string;
  @Input() bt2:string;
  @Input() lable:string;
  @Input() checkBt:boolean;
  bt1p=this.bt1;
  constructor() { }
  ngOnInit() {
  }

}
