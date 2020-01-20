import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/service/function/login.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  user = [];
  userUd=[];
  id;
  constructor(private loginservice: LoginService) { }

  ngOnInit() {
    this.loginservice.update();
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
    this.loginservice.getListUser().subscribe(data=>{
      this.user=data.data;
    })
    this.loginservice.watcher.subscribe(data=>{
      this.loginservice.getListUser().subscribe(data=>{
        this.user=data.data;
      })
    })

  }
  clearCoor() {
    document.getElementById("demo2").innerHTML = "";
  }
  deleteUser(id){
    this.loginservice.delete(JSON.stringify(id)).subscribe(res=>{
      this.loginservice.update();
    });
  }
  updateDB(){
    this.loginservice.update();
  }
  addItem(){

  }
  sentIdUpdate(id){
    this.userUd[0]=this.user[id];
  }
}
