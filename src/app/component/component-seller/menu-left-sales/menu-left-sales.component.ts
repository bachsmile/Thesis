import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { CategoryService } from 'src/service/function/categoty.service';
@Component({
  selector: 'app-menu-left-sales',
  templateUrl: './menu-left-sales.component.html',
  styleUrls: ['./menu-left-sales.component.scss']
})
export class MenuLeftSalesComponent implements OnInit {
  @Output() nextToLayout = new EventEmitter();
  @Output() valueChange = new EventEmitter();
  @Input() button :boolean;
  @Input() getSignalFromCategory:boolean;
  listCategory=[];
  counter ;
  colapse = false;

  constructor(private categoryservice:CategoryService) { }

  ngOnInit() {
    this.categoryservice.getList().subscribe(res=>{
      res.data.forEach(data => {
        if(data.action=='1'){
          this.listCategory.push(data);
        }
      });
    })
    this.categoryservice.watcher.subscribe(data=>{
      this.listCategory=[];
      this.categoryservice.getList().subscribe(res=>{
        res.data.forEach(data => {
          if(data.action=='1'){
            this.listCategory.push(data);
          }
        });
      });
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  rotate(data) {
    this.counter = data;
    this.valueChange.emit(this.counter);
    this.colapse = !this.colapse;
    if(document.getElementById(data)!=null){
      if (this.colapse) {
        document.getElementById(data).classList.add("fa-truck");
        document.getElementById(data).classList.remove("fa-truck-return");
      } else {
        document.getElementById(data).classList.remove("fa-truck");
        document.getElementById(data).classList.add("fa-truck-return");
      }
    }
  }
  nexToChildeLayout(data){
    this.nextToLayout.emit(data);
  }
}
