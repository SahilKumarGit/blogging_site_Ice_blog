import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  handel: ErrorHandel = new ErrorHandel(this.router, this.basic);
  loading: boolean = false

  constructor(private basic: BasicsService, private user: UserService, private router: Router,) { }

  ngOnInit(): void {
  }

  submit(val: any) {
    if (this.loading) return
    let { value, valid } = val
    if (!value.email || !value.email.trim()) return this.basic.alert('Email is required!')
    if (!value.password || !value.password.trim()) return this.basic.alert('Password is required!')

    // final validation
    if (!valid) return this.basic.alert('Somthing went wrong!')

    this.basic.loadingAction(true)
    this.loading = true
    //all ok save to server
    const data = { ...value }
    this.user.login(data).subscribe((o: any) => {
      this.user.setJwt(o.data.token)
      this.basic.loadingAction(false)
      this.loading = false
      this.router.navigateByUrl('')

    }, (x: any) => {
      this.handel.networkError(x)
      this.basic.loadingAction(false)
      this.loading = false

    })

  }

}
