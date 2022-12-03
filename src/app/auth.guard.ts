import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './Registrationsection/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private userService:UserService,private rt:Router){
   }

   check(){
    return this.userService.currentUser
   }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!!localStorage['currentUserEmail']){
        return true
      }else{
        this.rt.navigate(['Login'])
        return false;
      }
      
  }
  
}
