import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  setHeaders(): HttpHeaders {
    let headerO= new HttpHeaders();
    // headerO=headerO.append('Access-Control-Allow-Origin', '*');
    // headerO=headerO.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    // headerO=headerO.append('Accept','application/json');
    headerO=headerO.append('Content-Type','application/json');//// kiểu json giúp cho sever biết mình chuyển lên kiểu js 'Content-Type', 'application/json'
    const token= window.localStorage.getItem('token');  // add mã token vào localstorage
    if (token) {            // nếu có mã token tiến hành tạo mã Authorization
      headerO= headerO.append('Authorization', 'Bearer '+token);
   }
    return headerO;
  }
  post(path: string, data: any): Observable<any> {
    const url = `${environment.api_url}${path}`;
    // let k =`{"username":"${data.username}","password":"${data.password}"}`;
    // console.log(k)
    // return this.http.post(url, k, {headers: this.setHeaders()}).pipe(map(res => res[' result']));
    return this.http.post<boolean>(url, data)
          .pipe(
              map(response => {
                return response;
              }),

          );
  }
  get(path: string):Observable<any>{
    const url=`${environment.api_url}${path}`;
    return this.http.get(url);
  }

}
