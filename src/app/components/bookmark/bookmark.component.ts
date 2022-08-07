import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { BlogsAndTopicService } from 'src/services/blogsAndTopic/blogs-and-topic.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

  handel: ErrorHandel = new ErrorHandel(this.router, this.basics)
  page: number = 1
  totalPage: number = 2
  @ViewChild("listContainer") listContainer: any;
  loading: boolean = false
  LIST: any = []
  ERROR: any = null

  constructor(private basics: BasicsService, private router: Router, private Blogs_Topics: BlogsAndTopicService) {
    this.basics.navSelectorAction("BOOKMARK")
    this.loadBookmarks(this.page)
  }

  ngOnInit(): void {
  }

  onScroll(e: any): void {
    if (this.loading) return
    let scroll = (e.target.scrollTop / this.listContainer.nativeElement.clientHeight) * 100
    if (scroll <= 0) return
    if (this.totalPage <= this.page) return
    if (scroll >= 80) this.loadBookmarks(++this.page)
  }

  loadBookmarks(page: number) {
    this.loading = true
    console.log('load', page);
    this.Blogs_Topics.bookmarksList(page).subscribe((o: any) => {
      console.log(o)
      this.LIST.push(...o.data.list)
      this.totalPage = o.data.totalPages
      this.loading = false
      this.ERROR = this.LIST.length <= 0 ? "No Bookmarks Avalable!" : null
    }, (x: any) => {
      this.handel.networkError(x)
      this.ERROR = x.error.message
      this.loading = false
    })
  }

  removeFromList(i: any) {
    this.LIST.splice(i, 1)
    this.ERROR = this.LIST.length <= 0 ? "No Bookmarks Avalable!" : null
  }


}
