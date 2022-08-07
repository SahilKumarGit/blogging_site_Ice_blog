import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  handel: ErrorHandel = new ErrorHandel(this.router, this.basic);
  imgUri: string = "assets/image/user.png"
  rawImg: any = null
  loading: boolean = false

  constructor(private basic: BasicsService, private user: UserService, private router: Router,) { }

  ngOnInit(): void {
  }

  selectImg() {
    this.selectFile().then((e: any) => {
      if (e) this.rawImg = e
      else this.rawImg = null
    })
  }


  cropedData(img64: string) {
    this.imgUri = img64 || "assets/image/user.png"
    this.rawImg = null
  }


  submit(val: any) {
    if (this.loading) return
    let { value, valid } = val
    if (!this.imgUri || !this.imgUri.trim() || this.imgUri == 'assets/image/user.png') return this.basic.alert('Profile pic is required!')
    if (!value.name || !value.name.trim()) return this.basic.alert('Name is required!')
    if (!value.email || !value.email.trim()) return this.basic.alert('Email is required!')
    if (!value.password || !value.password.trim()) return this.basic.alert('Password is required!')

    // final validation
    if (!valid) return this.basic.alert('Somthing went wrong!')

    this.basic.loadingAction(true)
    this.loading = true
    //all ok save to server
    const data = { ...value, profilePic: this.imgUri }
    this.user.register(data).subscribe((o: any) => {
      this.basic.alert('✅ Account Created Successfully!')
      this.router.navigateByUrl('/login')
      this.basic.loadingAction(false)
      this.loading = false

    }, (x: any) => {
      this.handel.networkError(x)
      this.basic.loadingAction(false)
      this.loading = false

    })

  }



  //--------------------------------------------------------------------------------------
  selectFile(contentType: string = 'image/*') {
    return new Promise(resolve => {
      let input: any = document.createElement('input');
      input.type = 'file';
      input.multiple = false;
      input.accept = contentType;

      input.onchange = (e: any) => {
        resolve(e);
      };

      input.click();
    });
  }

}
