import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { BlogsAndTopicService } from 'src/services/blogsAndTopic/blogs-and-topic.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-each-list-card',
  templateUrl: './each-list-card.component.html',
  styleUrls: ['./each-list-card.component.scss']
})
export class EachListCardComponent implements OnInit {
  handel: ErrorHandel = new ErrorHandel(this.router, this.basic)
  @Output() onDeleteItem = new EventEmitter<string>();
  @Input() isBookmarked: boolean = false
  @Input() DATA: any = {
    "_id": "",
    "title": "",
    "innerText": "",
    "imgUrl": "assets/image/noimg.jpg",
    "userId": {
      "verified": false,
      "_id": "",
      "name": "",
      "profilePic": "assets/image/user.png"
    },
    "createdAt": "2022-08-03T13:11:15.251Z"
  }

  constructor(private user: UserService, private basic: BasicsService, private router: Router, private blog_topic: BlogsAndTopicService) { }

  ngOnInit(): void {
  }


  addBookMark() {
    const token = this.user.getJwt()
    if (!token) {
      this.basic.alert('🔑 You need to login first!')
      this.router.navigateByUrl('/login')
      return
    }

    // able to add bookmark
    this.blog_topic.addBookmark(this.DATA._id).subscribe((o: any) => {
      this.basic.alert(o.message)
    }, (x: any) => {
      this.handel.networkError(x)
    })
  }

  RemoveBookMark() {
    const token = this.user.getJwt()
    if (!token) {
      this.basic.alert('🔑 You need to login first!')
      this.router.navigateByUrl('/login')
      return
    }

    // able to add bookmark
    this.blog_topic.removeBookmark(this.DATA._id).subscribe((o: any) => {
      this.basic.alert(o.message)
      this.onDeleteItem.emit(this.DATA._id)
    }, (x: any) => {
      this.handel.networkError(x)
    })
  }

}
