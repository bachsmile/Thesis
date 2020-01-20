import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  loginSub: Subject<String>= new Subject();
  watcher: Observable<any>=this.loginSub.asObservable();
  constructor(private apiService:ApiService) { }
  update(){
    this.loginSub.next();
  }
  getList():Observable<any>{
    return this.apiService.get('category/category.php');
  }
  create(data):Observable<any>{
    return this.apiService.post('category/creatCategory.php',data);
  }
  delete(id){
    return this.apiService.post('category/delete.php',id);
  }
  updateIF(data){
    return  this.apiService.post('category/update.php',data);
  }
}
