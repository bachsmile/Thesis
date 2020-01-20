import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/service/function/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-design-now',
  templateUrl: './design-now.component.html',
  styleUrls: ['./design-now.component.scss']
})
export class DesignNowComponent implements OnInit {
  theme=true;
  thems=true;
  constructor(private loginservice:LoginService,
              private router:Router
    ) { }

  ngOnInit() {
  }
  choose_layout(data){
    switch (data) {
      case 'layout1':
        this.theme=true;
        break;
        case 'layout2':
          this.theme=false;
          break;
      default:
        break;
    }
    window.localStorage.setItem('theme',this.theme+'');
    this.loginservice.update();
    this.router.navigate(['/home']);
  }
}

