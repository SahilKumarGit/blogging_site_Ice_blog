import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { BlogsAndTopicService } from 'src/services/blogsAndTopic/blogs-and-topic.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  handel: ErrorHandel = new ErrorHandel(this.router, this.basic)
  DATA: any = null
  ERROR: any = null
  constructor(private basic: BasicsService, private user: UserService, private router: Router, private blog_topic: BlogsAndTopicService) {
    this.basic.navSelectorAction("STORIES")
    this.myBlogs()
  }

  ngOnInit(): void {
  }

  myBlogs() {
    const token = this.user.getJwt()
    if (!token) {
      this.basic.alert('🔑 You need to login first!')
      this.router.navigateByUrl('/login')
      return
    }

    // able to add bookmark
    this.blog_topic.myBlogs().subscribe((o: any) => {
      console.log(o)
      this.DATA = o.data
    }, (x: any) => {
      if ([400, 404].includes(x.status)) {
        this.ERROR = { status: x.status, message: x.error.message }
        return
      }
      this.handel.networkError(x)
    })
  }



  RemoveFromList(i: number) {
    this.DATA.splice(i, 1)
  }

}
