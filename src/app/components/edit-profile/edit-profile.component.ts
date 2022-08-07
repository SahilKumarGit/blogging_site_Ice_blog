import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { BlogsAndTopicService } from 'src/services/blogsAndTopic/blogs-and-topic.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  loading: boolean = true
  updating: boolean = false
  token: any = null
  DATA: any = null
  rawImg: any = null
  handel: ErrorHandel = new ErrorHandel(this.router, this.basic)
  constructor(private user: UserService, private basic: BasicsService, private router: Router) {
    this.token = this.user.getJwt()
    this.getUserInfo()
  }
  ngOnInit(): void {
  }

  getUserInfo() {
    if (!this.token) {
      this.basic.alert('🔑 You need to login first!')
      this.router.navigateByUrl('/login')
      return
    }
    this.loading = true
    // ----------------------------------
    this.user.userBasic().subscribe((o: any) => {
      this.loading = false
      this.DATA = o.data
    }, (x: any) => {
      this.loading = false
      this.handel.networkError(x)
    })
  }






  selectImg() {
    this.selectFile().then((e: any) => {
      if (e) this.rawImg = e
      else this.rawImg = null
    })
  }


  cropedData(img64: string) {
    this.DATA.profilePic = img64 || "assets/image/user.png"
    this.rawImg = null
  }


  submit(val: any) {
    if (this.updating) return

    if (!this.token) {
      this.basic.alert('🔑 You need to login first!')
      this.router.navigateByUrl('/login')
      return
    }

    const body = { ...val.value, profilePic: this.DATA.profilePic }

    if (!body.name.trim()) this.basic.alert('User\'s name is required!')
    if (!body.email.trim()) this.basic.alert('User\'s email address is required!')
    if (!body.profilePic.trim()) this.basic.alert('User\'s profile pic is required!')

    this.updating = true
    this.basic.loadingAction(true)

    this.user.profileUpdate(body).subscribe((o: any) => {
      this.basic.alert('✅ Profile updated successfully!')
      this.updating = false
      this.basic.loadingAction(false)
      this.user.setUserInfo(o.data)
      this.router.navigateByUrl('')
    }, (x: any) => {
      this.updating = false
      this.basic.loadingAction(false)
      this.handel.networkError(x)
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
