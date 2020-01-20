import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/service/function/event.service';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {

  constructor( private eventservice : EventService) { }
  shops;
  listCustomer=[];
  ngOnInit() {
    document.onmousemove=e => {

      let x = e.clientX;
      let y = e.clientY;

      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      let mouseXpercentage = Math.round(e.pageX / windowWidth * 100);
      let mouseYpercentage = Math.round(e.pageY / windowHeight * 100);

  }
  document.getElementById('load1').style.display='block';
  document.getElementById('admin1').style.display='none';
  setTimeout(function(){
    document.getElementById('load1').style.display='none';
    document.getElementById('admin1').style.display='block';
  }, 1000);
    let shop={
      ID_Shop:window.localStorage.getItem('ID')
    }
    this.shops=shop;
    this.eventservice.getListCustomerID(JSON.stringify(shop)).subscribe(res=>{
      this.listCustomer=res.data;
      console.log(res);
      console.log(this.listCustomer)
    })
  }

}
