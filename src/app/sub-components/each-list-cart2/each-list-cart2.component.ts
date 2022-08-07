import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { BlogsAndTopicService } from 'src/services/blogsAndTopic/blogs-and-topic.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-each-list-cart2',
  templateUrl: './each-list-cart2.component.html',
  styleUrls: ['./each-list-cart2.component.scss']
})
export class EachListCart2Component implements OnInit {
  token: any = null
  deleteDialog: any = null
  handel: ErrorHandel = new ErrorHandel(this.router, this.basic)
  @Output() onDeleteItem = new EventEmitter<string>();
  @Input() showBookmark: boolean = false
  @Input() showDelete: boolean = false
  @Input() showEdit: boolean = false
  @Input() showReport: boolean = false
  @Input() DATA: any = {
    "_id": "",
    "title": "",
    "innerText": "",
    "imgUrl": "assets/image/noimg.jpg",
    "userId": "",
    "createdAt": "2022-08-03T13:11:15.251Z"
  }

  constructor(private user: UserService, private basic: BasicsService, private router: Router, private blog_topic: BlogsAndTopicService) {
    this.token = this.user.getJwt()
  }

  ngOnInit(): void {
  }


  addBookMark() {

    if (!this.token) {
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

    if (!this.token) {
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


  makeDelete() {
    this.deleteDialog = {
      Heading: "Delete Alert!",
      SubHeading: "Are you sure you want to delete this blog?",
      Cancel: 'Cancel',
      Ok: 'Yes, Delete'
    }
  }

  dialogAction(action: string) {
    this.deleteDialog = null
    if (action == 'YES') this.actionDelete()
  }

  actionDelete() {
    if (!this.token) {
      this.basic.alert('🔑 You need to login first!')
      this.router.navigateByUrl('/login')
      return
    }

    this.blog_topic.removeBlog(this.DATA._id).subscribe((o: any) => {
      this.basic.alert(o.message)
      this.onDeleteItem.emit(this.DATA._id)
    }, (x: any) => {
      this.handel.networkError(x)
    })
  }

}
