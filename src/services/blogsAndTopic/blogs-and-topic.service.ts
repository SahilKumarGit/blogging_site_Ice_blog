import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { url } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class BlogsAndTopicService {

  constructor(private http: HttpClient, private user: UserService, private router: Router) { }


  /**
   * here is a servise for changing the nav selector
  */
  private publishBlogPopup = new BehaviorSubject<any>(null)
  publishBlogPopupStatus = this.publishBlogPopup.asObservable();

  publishBlogPopupAction(val: any = null) {
    this.publishBlogPopup.next(val)
  }


  // topic --------------------------------
  topicList() {
    return this.http.get(url.topic.list)
  }


  // topic --------------------------------
  topicAvalable() {
    return this.http.get(url.topic.avalable)
  }


  // blog add --------------------------------
  blogAdd(body: any) {
    const JWT: any = this.user.getJwt()
    const headers = new HttpHeaders()
      .set('x-api-key', JWT);
    return this.http.post(url.blog.add, body, { headers })
  }


  // blog Update --------------------------------
  blogUpdate(body: any) {
    const JWT: any = this.user.getJwt()
    const headers = new HttpHeaders()
      .set('x-api-key', JWT);
    return this.http.put(url.blog.update, body, { headers })
  }


  // blog list --------------------------------
  blogList(page: number, search: string = '') {
    return this.http.get(`${url.blog.list}?page=${page}&search=${search}`)
  }

  // blog list by topic --------------------------------
  blogListByTopic(page: number, topic: string) {
    return this.http.get(`${url.blog.list}?page=${page}&topic=${topic}`)
  }


  // blog view --------------------------------
  blogViewOne(id: any) {
    const JWT: any = this.user.getJwt()
    const headers = new HttpHeaders()
      .set('x-api-key', JWT || "");
    return this.http.get(`${url.blog.view}/${id}`, { headers })
  }


  // blog view --------------------------------
  blogReadHistory() {
    const JWT: any = this.user.getJwt()
    const headers = new HttpHeaders()
      .set('x-api-key', JWT);
    return this.http.get(url.blog.history, { headers })
  }



  // blog bookmark add --------------------------------
  addBookmark(blogId: string) {
    const JWT: any = this.user.getJwt()
    const headers = new HttpHeaders()
      .set('x-api-key', JWT);
    return this.http.post(url.blog.bookmark.add, { blogId }, { headers })
  }



  // blog bookmark delete --------------------------------
  removeBookmark(blogId: string) {
    const JWT: any = this.user.getJwt()
    const headers = new HttpHeaders()
      .set('x-api-key', JWT);
    return this.http.delete(url.blog.bookmark.remove, { headers, body: { blogId } })
  }


  // blog view --------------------------------
  bookmarksList(page: number) {
    const JWT: any = this.user.getJwt()
    const headers = new HttpHeaders()
      .set('x-api-key', JWT);
    return this.http.get(`${url.blog.bookmark.list}?page=${page}`, { headers })
  }


  // blog view --------------------------------
  myBlogs() {
    const JWT: any = this.user.getJwt()
    const headers = new HttpHeaders()
      .set('x-api-key', JWT);
    return this.http.get(url.blog.myBlogs, { headers })
  }

  // blog view --------------------------------
  myOneBlogs(blogId: any) {
    const JWT: any = this.user.getJwt()
    const headers = new HttpHeaders()
      .set('x-api-key', JWT);
    return this.http.get(`${url.blog.my}/${blogId}`, { headers })
  }


  removeBlog(blogId: string) {
    const JWT: any = this.user.getJwt()
    const headers = new HttpHeaders()
      .set('x-api-key', JWT);
    return this.http.delete(`${url.blog.delete}/${blogId}`, { headers, body: { blogId } })
  }
}
