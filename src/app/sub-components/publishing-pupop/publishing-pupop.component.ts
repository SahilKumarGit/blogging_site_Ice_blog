import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { BlogsAndTopicService } from 'src/services/blogsAndTopic/blogs-and-topic.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-publishing-pupop',
  templateUrl: './publishing-pupop.component.html',
  styleUrls: ['./publishing-pupop.component.scss']
})
export class PublishingPupopComponent implements OnInit {
  handel: ErrorHandel = new ErrorHandel(this.router, this.basic)
  data: any = null;
  loading: boolean = false
  topicList: any = []

  constructor(private blogAndTopic: BlogsAndTopicService, private user: UserService, private router: Router, private basic: BasicsService) {
    this.blogAndTopic.publishBlogPopupStatus.subscribe((e: any) => {
      this.data = e
      if (e) this.loadTopic()
    })
  }

  ngOnInit(): void {
  }



  loadTopic() {
    if (this.loading) return
    this.blogAndTopic.topicList().subscribe((o: any) => {
      this.topicList = o.data
    }, (x: any) => {
      this.handel.networkError(x)
    })
  }

  close() {
    if (this.loading) return
    this.blogAndTopic.publishBlogPopupAction(null)
  }


  submit(val: any) {
    if (this.loading) return
    if (!this.data.title || !this.data.title.trim()) return this.basic.alert('Title must be required!')
    if (!this.data.topic || !this.data.topic.trim()) return this.basic.alert('Please select a topic!')

    // final validation
    if (!val.valid) return this.basic.alert('Something went worng!')


    const Body = {
      ...this.data
    }

    if (Body.blogId) this.update(Body);
    else this.addNew(Body);
  }


  addNew(Body: any) {
    this.basic.loadingAction(true)
    this.blogAndTopic.blogAdd(Body).subscribe((o: any) => {
      // console.log(o)
      this.basic.loadingAction(false)
      this.basic.alert('✅ Blog added successfully!')
      this.router.navigateByUrl('')
    }, (x: any) => {
      this.basic.loadingAction(false)
      this.handel.networkError(x)
    })
  }


  update(Body: any) {
    this.basic.loadingAction(true)
    this.blogAndTopic.blogUpdate(Body).subscribe((o: any) => {
      // console.log(o)
      this.basic.loadingAction(false)
      this.basic.alert('✅ Blog updated successfully!')
      this.router.navigateByUrl('')
    }, (x: any) => {
      this.basic.loadingAction(false)
      this.handel.networkError(x)
    })
  }
}
