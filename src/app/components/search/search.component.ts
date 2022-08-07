import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { BlogsAndTopicService } from 'src/services/blogsAndTopic/blogs-and-topic.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  handel: ErrorHandel = new ErrorHandel(this.router, this.basics)
  TOPICLIST: any = []
  HISTORYLIST: any = []

  page: number = 1
  totalPage: number = 2
  isEmptyInput: boolean = true
  search: string = ""
  @ViewChild("listContainer") listContainer: any;
  loading: boolean = false
  LIST: any = []
  ERROR: any = null

  constructor(private basics: BasicsService, private user: UserService, private blog_topic: BlogsAndTopicService, private router: Router) {
    this.basics.navSelectorAction("SEARCH")
    this.getAvalableTopics()
    this.getReadHistory()
  }

  ngOnInit(): void {
  }

  applySearch(element: any) {
    this.search = element.value
    this.page = 1
    this.totalPage = 2
    this.LIST = []
    this.ERROR = null
    if (!this.search.trim()) return
    this.loadBlogs(this.page)
  }

  clearSearch() {
    this.isEmptyInput = true
    this.search = ""
    this.page = 1
    this.totalPage = 2
    this.LIST = []
    this.ERROR = null
  }



  getAvalableTopics() {
    this.blog_topic.topicAvalable().subscribe((o: any) => {
      this.TOPICLIST = o.data
    }, (x: any) => {
      this.handel.networkError(x)
    })
  }


  getReadHistory() {
    const token = this.user.getJwt() || null
    if (!token) return
    this.blog_topic.blogReadHistory().subscribe((o: any) => {
      this.HISTORYLIST = o.data
    }, (x: any) => {
      this.handel.networkError(x)
    })
  }










  onScroll(e: any): void {
    if (!this.search.trim()) return
    if (this.loading) return
    let scroll = (e.target.scrollTop / this.listContainer.nativeElement.clientHeight) * 100
    if (scroll <= 0) return
    if (this.totalPage <= this.page) return
    if (scroll >= 80) this.loadBlogs(++this.page)
    console.log('k')
  }

  loadBlogs(page: number) {
    this.loading = true
    this.ERROR = null
    console.log('load', page);
    this.blog_topic.blogList(page, this.search).subscribe((o: any) => {
      this.LIST.push(...o.data.list)
      this.totalPage = o.data.totalPages
      this.loading = false
      if(this.LIST.length <= 0) this.ERROR = "Search result NOT found!"
    }, (x: any) => {
      this.handel.networkError(x)
      this.loading = false
    })
  }

}
