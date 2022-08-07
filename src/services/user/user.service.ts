import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { url } from 'src/environments/environment';
import { BasicsService } from '../basics/basics.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  handel: ErrorHandel = new ErrorHandel(this.router, this.basic)
  constructor(private http: HttpClient, private basic: BasicsService, private router: Router) {
    this.getUserInfo()
  }

  register(data: any) {
    return this.http.post(url.user.register, data)
  }

  login(data: any) {
    return this.http.post(url.user.login, data)
  }

  userBasic() {
    const JWT: any = this.getJwt()
    const headers = new HttpHeaders()
      .set('x-api-key', JWT);
    return this.http.get(url.user.basic, { headers })
  }

  profile(uid: string) {
    const JWT: any = this.getJwt()
    const headers = new HttpHeaders()
      .set('x-api-key', JWT);
    return this.http.get(`${url.user.profile}/${uid}`, { headers })
  }

  profileUpdate(data: any) {
    const JWT: any = this.getJwt()
    const headers = new HttpHeaders()
      .set('x-api-key', JWT);
    return this.http.put(url.user.update, data, { headers })
  }

  followUnfollow(uid: string) {
    const JWT: any = this.getJwt()
    const headers = new HttpHeaders()
      .set('x-api-key', JWT);
    return this.http.post(`${url.user.followUnfollow}/${uid}`, {}, { headers })
  }

  setJwt(val: string) {
    localStorage.setItem('token', val)
  }

  getJwt() {
    return localStorage.getItem('token') || null
  }



  private userInfoSub = new BehaviorSubject<any>({
    name: "",
    profilePic: "/assets/image/user.png",
    _id: ""
  })
  userInfo = this.userInfoSub.asObservable();

  getUserInfo() {
    console.log('Try to login...')
    let JWT = this.getJwt()
    if (!JWT) {
      this.userInfoSub.next({
        name: "",
        profilePic: "/assets/image/user.png",
        _id: ""
      })
      return
    }
    const headers = new HttpHeaders()
      .set('x-api-key', JWT);
    this.http.get(url.user.basic, { headers }).subscribe((o: any) => {
      console.log('Login: success')
      this.userInfoSub.next(o.data)
      return
    }, (x: any) => {
      console.log('Login: failed')
      this.userInfoSub.next({
        name: "",
        profilePic: "/assets/image/user.png",
        _id: ""
      })
      this.handel.networkError(x)
      return
    })
  }

  setUserInfo(data: any) {
    this.userInfoSub.next(({
      name: data.name ? data.name : "",
      profilePic: data.profilePic ? data.profilePic : "/assets/image/user.png",
      _id: data._id ? data._id : ""
    }))
  }
}
