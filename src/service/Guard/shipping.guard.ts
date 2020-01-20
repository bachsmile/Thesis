import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingGuard  implements CanActivate {
  constructor(private router: Router) {};

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise(async resolve => {
        const token = window.localStorage.getItem('token');
        const user = window.sessionStorage.getItem('user');
        const id= window.localStorage.getItem('ID');
        // let sells
        //   if(id!=null){
        //     sells=id.slice(0,2);
        //   }
        //   console.log(sells)
        if (token !=null && (user==='shipper')) {
          // this.router.navigate(['/login']);
          console.log(token)
          return resolve(true);
        }
        console.log("false");
        this.router.navigate(['/login']);
        alert('You are not logged in. Let go to login again now!!!')
        return resolve(false);
      });
  }
}

