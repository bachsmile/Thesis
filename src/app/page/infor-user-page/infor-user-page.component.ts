import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/service/function/login.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-infor-user-page',
  templateUrl: './infor-user-page.component.html',
  styleUrls: ['./infor-user-page.component.scss']
})
export class InforUserPageComponent implements OnInit {
  user=[];
  pass='';
  commPass='';
  passNew='';
  check=false;
  check2=false;
  constructor(private loginService:LoginService,private toast:ToastrService) { }

  ngOnInit() {
    let id={
      MaAcount:window.localStorage.getItem('ID')
    }
    this.loginService.getInfoUserID(JSON.stringify(id)).subscribe(res=>{
      this.user=res.data;
      console.log(this.user);
      this.pass=this.user[0].Password;
    })
    this.loginService.watcher.subscribe(res=>{
      let id={
        MaAcount:window.localStorage.getItem('ID')
      }
      this.loginService.getInfoUserID(JSON.stringify(id)).subscribe(res=>{
        this.user=res.data;
        console.log(this.user);
        this.pass=this.user[0].Password;
      })
    })
  }
  changePass(item){
    item.Password=this.passNew;
    console.log(item);
    this.loginService.updateIF(JSON.stringify(item)).subscribe(res=>{
      console.log(res);
      if(res.data[0].delete=='success'){
        document.getElementById('contentId').classList.remove('show');
        this.check=false;
        this.check2=false;
        this.commPass='';
        this.passNew='';
        this.toast.success('Change password successfully', 'update success!!')
        this.loginService.update();
      }
      else{
        this.toast.error('Change password error', 'update error!!')
      }
    })
  }
  commit(){
   
    if(this.commPass==this.pass){
      console.log('ok');
      this.check=true;
      document.getElementById('commit').setAttribute('disabled','disabled');
      this.check2=true;
    }
    else{
      this.check=false;
      this.check2=false;
    }
  }
}
