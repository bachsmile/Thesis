import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellsAccountGuardGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router) {};

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise(async resolve => {
        const token = window.localStorage.getItem('token');
        const user = window.sessionStorage.getItem('user');
        const id= window.sessionStorage.getItem('ID');
        let sells='';
          if(id!=null){
             sells=id.slice(0,2);
          }
          console.log(sells)
        if (token !=null && (user==='admin'|| sells==='SE') ) {//&& (user==='admin'|| sells==='SE')
          // this.router.navigate(['/login']);
          return resolve(true);
        }
        console.log("false");
        this.router.navigate(['/home']);
        alert('Your account has no sales rights. Should not be able to access this page !!!')
        return resolve(false);
      });
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
