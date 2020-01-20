import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../api.service';


@Injectable({
  providedIn: 'root'
})
export class CharityFundService {
  loginSub: Subject<String>= new Subject();
  watcher: Observable<any>=this.loginSub.asObservable();
  constructor(private apiService:ApiService) { }
  update(){
    this.loginSub.next();
  }
  getFund():Observable<any>{
    return this.apiService.get('charity/read.php');
  }
  getFundID(id):Observable<any>{
    return this.apiService.post('charity/readID.php',id);
  }
  create(data):Observable<any>{
    return this.apiService.post('charity/create.php',data);
  }

}
