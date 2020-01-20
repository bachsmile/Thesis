import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/service/function/login.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  user: User = new User() ;
  @Output() voteSize = new EventEmitter();
  counter: number = 0;
  check=true;
  constructor(private loginservice: LoginService,
              private router: Router
    ) { }

  ngOnInit() {

  }
  voted(event){
    this.counter ++;
    this.voteSize.emit(this.counter);
    console.log(this.counter);
  }
  onSubmit() {
    this.loginservice.login(JSON.stringify(this.user)).subscribe(
      data => {
        console.log('đăng nhập thành công');
        console.log(data.success);
        if(data.success==='true'){
          this.loginservice.getInfoUser(JSON.stringify(this.user)).subscribe(res=>{
            console.log(this.user);
            console.log(res.data[0].MaAcount);
            window.localStorage.setItem('ID',res.data[0].MaAcount+'');
            window.sessionStorage.setItem('ID',res.data[0].MaAcount+'');
          })
          console.log(data);
          window.localStorage.setItem('token', data.token);
          window.sessionStorage.setItem('user',data.username);
          //window.sessionStorage.setItem('user',this.user.username.toString());
          if(data.username=='admin'){
            setTimeout(() => {
              this.router.navigate(['/admin']);
            }, 1000);
          }
          else{
            if(data.username=='shipper'){
              this.router.navigate(['/Shipping-page']);
            }
            else{
              this.router.navigate(['/home']);
            }
          }
        }
          else{
            console.log('đăng nhập thất bại');
            console.log(data);
            this.check=false;
          }
      },
      errors => {
        console.log('đăng nhập thất bại');
      }
    );
  }

}
