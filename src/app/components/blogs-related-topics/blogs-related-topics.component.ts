import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { BlogsAndTopicService } from 'src/services/blogsAndTopic/blogs-and-topic.service';

@Component({
  selector: 'app-blogs-related-topics',
  templateUrl: './blogs-related-topics.component.html',
  styleUrls: ['./blogs-related-topics.component.scss']
})
export class BlogsRelatedTopicsComponent implements OnInit {
  handel: ErrorHandel = new ErrorHandel(this.router, this.basics)
  page: number = 1
  totalPage: number = 2
  @ViewChild("listContainer") listContainer: any;
  loading: boolean = false
  LIST: any = []
  ERROR: any = null
  topic: any = null
  constructor(private activatedRoute: ActivatedRoute,private basics: BasicsService, private router: Router, private Blogs_Topics: BlogsAndTopicService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.topic = params.topic
      this.loadBlogs(this.page)
    });
  }


  onScroll(e: any): void {
    if (this.loading) return
    let scroll = (e.target.scrollTop / this.listContainer.nativeElement.clientHeight) * 100
    if (scroll <= 0) return
    if (this.totalPage <= this.page) return
    if (scroll >= 80) this.loadBlogs(++this.page)
  }

  loadBlogs(page: number) {
    this.loading = true
    console.log('load', page);
    this.Blogs_Topics.blogListByTopic(page,this.topic).subscribe((o: any) => {
      this.LIST.push(...o.data.list)
      this.totalPage = o.data.totalPages
      if(this.LIST.length<=0) this.ERROR = "No blogs avalable related to this topic!"
      this.loading = false
    }, (x: any) => {
      this.handel.networkError(x)
      this.loading = false
    })
  }


}
