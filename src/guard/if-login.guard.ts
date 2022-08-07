import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BasicsService } from 'src/services/basics/basics.service';
import { UserService } from 'src/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class IfLoginGuard implements CanActivate {
  constructor(private user: UserService, private router: Router, private basic: BasicsService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.user.getJwt() || null
    if (token) { return true }
    this.basic.alert('🔑 You need to login first!')
    this.router.navigateByUrl('/login');
    return false;
  }

}
