import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { BlogsAndTopicService } from 'src/services/blogsAndTopic/blogs-and-topic.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  handel: ErrorHandel = new ErrorHandel(this.router, this.basic)
  token: any = null
  userId: any = null
  DATA: any = null
  ERROR: any = null;
  isFollowed: boolean = false;
  loadingOnFollow: boolean = false;
  constructor(private user: UserService, private basic: BasicsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.token = this.user.getJwt()
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params.id
      this.getProfile()
    });
  }

  getProfile() {
    if (!this.token) {
      this.basic.alert('🔑 You need to login first!')
      this.router.navigateByUrl('/login')
      return
    }

    // able to add bookmark
    this.user.profile(this.userId).subscribe((o: any) => {
      console.log(o)
      this.DATA = o.data
      this.isFollowed = this.DATA.user.followed
      console.log(this.DATA.user.followed)
    }, (x: any) => {
      if ([404, 400].includes(x.status)) {
        this.ERROR = { status: x.status, message: x.error.message }
        return
      }
      this.handel.networkError(x)
    })
  }


  followUnfollow() {
    if (this.loadingOnFollow) return
    if (!this.token) {
      this.basic.alert('🔑 You need to login first!')
      this.router.navigateByUrl('/login')
      return
    }
    this.loadingOnFollow = true
    this.user.followUnfollow(this.userId).subscribe((o: any) => {
      console.log(o)
      this.isFollowed = o.data.followed
      if (this.isFollowed) ++this.DATA.user.follower;
      else --this.DATA.user.follower;

      this.loadingOnFollow = false
    }, (x: any) => {
      this.loadingOnFollow = false
      this.handel.networkError(x)
    })
  }


  RemoveFromList(i: number) {
    this.DATA.blog.splice(i, 1)
  }

}
