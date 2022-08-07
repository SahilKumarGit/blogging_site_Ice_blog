import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class IfLogoutGuard implements CanActivate {
  constructor(private user: UserService, private router:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.user.getJwt() || null
    if (token){ this.router.navigateByUrl('/'); return false}
    return true;
  }

}
