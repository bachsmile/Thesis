import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{
  constructor(private router: Router) {};

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise(async resolve => {
        const token = window.localStorage.getItem('token');
        const user = window.sessionStorage.getItem('user');
        const id= window.localStorage.getItem('ID');
        if (token !=null && (user==='admin')) {
          // this.router.navigate(['/login']);
          return resolve(true);
        }
        console.log("false");
        this.router.navigate(['/home']);
        alert('Your account has no admin rights. Should not be able to access this page !!!')
        return resolve(false);
      });
  }
}
