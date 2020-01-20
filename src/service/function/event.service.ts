import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ApiService } from '../api.service';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  messageSource = new BehaviorSubject<any>(true);
  currentMessage = this.messageSource.asObservable();

  public listBag=[];
  public headerCheck=true;
  loginSub: Subject<String>= new Subject();
  watcher: Observable<any>=this.loginSub.asObservable();
  constructor(private apiService:ApiService) { }
  changeMessage(message) {
    this.messageSource.next(message);
  }
  update(){
    this.loginSub.next();
  }
  updateInFoShop(data){
    return  this.apiService.post('info/update.php',data);
  }
  updatePlace(data){
    return  this.apiService.post('place/update.php',data);
  }
  updateDis(data){
    return  this.apiService.post('discount/update.php',data);
  }
  getAnnounce():Observable<any>{
    return this.apiService.get('announce/read.php');
  }
  getPlace():Observable<any>{
    return this.apiService.get('place/read.php');
  }
  getUserAuction():Observable<any>{
    return this.apiService.get('userAuction/read.php');
  }
  getUserAuctionID(id):Observable<any>{
    return this.apiService.post('userAuction/readID.php',id);
  }
  getAnounceID(id):Observable<any>{
    return this.apiService.post('announce/readID.php',id);
  }
  getListComent(id):Observable<any>{
    return this.apiService.post('Comment/readID.php',id);
  }
  createAnnounce(data):Observable<any>{
    return this.apiService.post('announce/create.php',data);
  }
  getInfoID(id):Observable<any>{
    return this.apiService.post('info/readID.php',id);
  }
  getDis():Observable<any>{
    return this.apiService.get('discount/read.php');
  }
  getDisID(id):Observable<any>{
    return this.apiService.post('discount/readID.php',id);
  }
  getListCustomerID(id):Observable<any>{
    return this.apiService.post('customer/readID.php',id);
  }
  createCUS(data){
    return this.apiService.post('customer/create.php',data);
  }
  createInFoShop(data){
    return this.apiService.post('info/create.php',data);
  }
  createPlace(data){
    return this.apiService.post('place/create.php',data);
  }
  createUserAuction(data){
    return this.apiService.post('userAuction/create.php',data);
  }
  createMail(data){
    return this.apiService.post('mail/mail.php',data)
  }
  createDis(data){
    return this.apiService.post('discount/create.php',data)
  }
  createComment(data):Observable<any>{
    return this.apiService.post('Comment/create.php',data);
  }
  deletePlace(data):Observable<any>{
    return this.apiService.post('place/delete.php',data)
  }
}
