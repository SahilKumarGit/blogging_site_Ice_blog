import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { BlogsAndTopicService } from 'src/services/blogsAndTopic/blogs-and-topic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  handel: ErrorHandel = new ErrorHandel(this.router, this.basics)
  page: number = 1
  totalPage: number = 2
  @ViewChild("listContainer") listContainer: any;
  loading: boolean = false
  LIST: any = []

  constructor(private basics: BasicsService, private router: Router, private Blogs_Topics: BlogsAndTopicService) {
    this.basics.navSelectorAction("HOME")
    this.loadBlogs(this.page)
  }

  ngOnInit(): void {
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
    this.Blogs_Topics.blogList(page).subscribe((o: any) => {
      this.LIST.push(...o.data.list)
      this.totalPage = o.data.totalPages
      this.loading = false
    }, (x: any) => {
      this.handel.networkError(x)
      this.loading = false
    })
  }

}
