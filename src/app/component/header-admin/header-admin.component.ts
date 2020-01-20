import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent  implements OnInit {
  button = false;
  colapse = false;
  @Output() width_rep= new EventEmitter() ;
  @Output() sent_check_button= new EventEmitter();
  manager='Admin';
  constructor(private router:Router) {}

  ngOnInit() {
    // let i, choose;
    // choose = document.getElementsByClassName("extends");
    // for (i = 0; i < choose.length; i++) {
    //   choose[i].style.display = "none";
    // }
    // this.checkTreeview();
    this.manager=window.sessionStorage.getItem('user');
  }
  NavEvent() {
    this.button = !this.button;
    if (this.button) {
      this.openNav();
    } else {
      this.closeNav();
    }
    this.sent_check_button.emit(this.button);
  }
  openNav() {
    // let i, choose;
    // document
    //   .getElementById("header-left")
    // document.getElementById("mySidepanel").style.width = "100%";
    // document.getElementById("image").style.width = "45px";
     this.width_rep.emit(this.button);
    // setTimeout(function() {
    //   choose = document.getElementsByClassName("extends");
    //   for (i = 0; i < choose.length; i++) {
    //     choose[i].style.display = "unset";
    //   }
    // }, 250);

    // this.deleteCheck();
  }
  closeNav() {
    // let i, choose;
    // document
    // document.getElementById("mySidepanel").style.width = "65px";
    // document.getElementById("image").style.width = "35px";
     this.width_rep.emit(this.button)
    // setTimeout(function() {

    // });
    // choose = document.getElementsByClassName("extends");
    // for (i = 0; i < choose.length; i++) {
    //   choose[i].style.display = "none";
    // }
    // this.checkTreeview();
  }
  checkTreeview() {
    let k = document.getElementsByClassName("treeview");
    for (let index = 0; index < k.length; index++) {
      let list2 = k[index].getElementsByTagName("a");
      list2[0].style.textAlign = "center";
    }
  }
  deleteCheck() {
    let k = document.getElementsByClassName("treeview");
    for (let index = 0; index < k.length; index++) {
      let list2 = k[index].getElementsByTagName("a");
      list2[0].style.textAlign = "left";
    }
  }
  logout(){
    window.sessionStorage.clear();
    window.localStorage.clear();
    this.router.navigate(['/login']);
 }
}

