import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginSub: Subject<String>= new Subject();
  watcher: Observable<any>=this.loginSub.asObservable();
  constructor(private apiService:ApiService) { }
  update(){
    this.loginSub.next();
  }
  login(data):Observable<any> {
    console.log(data);
    return this.apiService.post('login/login.php', data);
  }
  getListUser():Observable<any>{
    return this.apiService.get('login/listUser.php');
  }
  getInfoUser(data):Observable<any>{
    return this.apiService.post('login/user.php',data)
  }
  getInfoUserID(data):Observable<any>{
    return this.apiService.post('login/userID.php',data)
  }
  create(data){
    return this.apiService.post('login/register.php',data);
  }
  delete(id){
    return this.apiService.post('login/delete.php',id);
  }
  updateIF(data){
    return  this.apiService.post('login/update.php',data);
  }
}
