import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  loginSub: Subject<String>= new Subject();
  watcher: Observable<any>=this.loginSub.asObservable();
  messageSource = new BehaviorSubject<string>("default message");
  currentMessage = this.messageSource.asObservable();
  constructor(private apiService:ApiService) { }
  update(){
    this.loginSub.next();
  }
  getProd():Observable<any>{
    return this.apiService.get('sanpham/read.php');
  }
  getProdID(id):Observable<any>{
    return this.apiService.post('sanpham/readID.php',id);
  }
  getWarehoseID(id):Observable<any>{
    return this.apiService.post('warehose/readID.php',id);
  }
  getItem(id):Observable<any>{
    return this.apiService.post('sanpham/product.php',id);
  }
  getListOrder():Observable<any>{ //get all order
    return this.apiService.get('orders/read.php');
  }
  getListOrderID(id):Observable<any>{ //get order id shop
    return this.apiService.post('orders/readID.php',id);
  }
  getItemOrder(id):Observable<any>{ //get id order
    return this.apiService.post('orders/getID.php',id);
  }
  getItemOrderCus(id):Observable<any>{ //get order customer
    return this.apiService.post('orders/readCus.php',id);
  }
  getAucrion():Observable<any>{
    return this.apiService.get('Auction/product_auction.php');
  }
  getAucrionID(id):Observable<any>{
    return this.apiService.post('Auction/readID.php',id);
  }
  create(data):Observable<any>{
    return this.apiService.post('sanpham/create.php',data);
  }

  createAuction(data):Observable<any>{
    return this.apiService.post('Auction/create_auction.php',data);
  }
  createWarehose(data):Observable<any>{
    return this.apiService.post('warehose/create.php',data);
  }
  createOrders(data):Observable<any>{
    return this.apiService.post('orders/create.php',data);
  }
  delete(id){
    return this.apiService.post('sanpham/delete.php',id);
  }
  deleteWH(id){
    return this.apiService.post('warehose/delete.php',id);
  }
  deleteAucT(id){
    return this.apiService.post('Auction/delete.php',id);
  }
  deleteOrder(id){
    return this.apiService.post('orders/delete.php',id);
  }
  updateIF(data){
    return  this.apiService.post('sanpham/update.php',data);
  }
  upOrder(data){
    return  this.apiService.post('orders/update.php',data);
  }
  upDateAuction(data){
    return  this.apiService.post('Auction/update.php',data);
  }
  upWarehoseID(data){
    return  this.apiService.post('warehose/updateID.php',data);
  }
  changeMessage(message) {
    this.messageSource.next(message);
    console.log(message);
  }
}
