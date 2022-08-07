import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { BlogsAndTopicService } from 'src/services/blogsAndTopic/blogs-and-topic.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-other-data',
  templateUrl: './other-data.component.html',
  styleUrls: ['./other-data.component.scss']
})
export class OtherDataComponent implements OnInit {
  handel: ErrorHandel = new ErrorHandel(this.router, this.basics)
  TOPICLIST: any = null
  constructor(private basics: BasicsService, private user: UserService, private blog_topic: BlogsAndTopicService, private router: Router) { }

  ngOnInit(): void {
    this.getAvalableTopics()
  }



  getAvalableTopics() {
    this.blog_topic.topicAvalable().subscribe((o: any) => {
      this.TOPICLIST = o.data
    }, (x: any) => {
      this.handel.networkError(x)
    })
  }

}
