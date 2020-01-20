import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batch-processing',
  templateUrl: './batch-processing.component.html',
  styleUrls: ['./batch-processing.component.scss']
})
export class BatchProcessingComponent implements OnInit {
  marked = false;
  angel=false;
  theCheckbox = false;
  constructor() { }

  ngOnInit() {
  }
  chooseTitle(){
      document.getElementById('title1').classList.add('acrive-red');
  }
  toggleVisibility(e){
    this.marked= e.target.checked;
  }
  rotato(){
    this.angel=!this.angel;
  }
}
