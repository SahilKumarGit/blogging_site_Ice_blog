import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Quill from 'quill';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { BlogsAndTopicService } from 'src/services/blogsAndTopic/blogs-and-topic.service';
import { UserService } from 'src/services/user/user.service';
const icons = Quill.import('ui/icons');


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  handel: ErrorHandel = new ErrorHandel(this.router, this.basics)

  innerHtml: any = ""
  innerText: any = ""
  imageUrl: any = null
  default_note: any = "dfgfvv"
  bid: any = null
  token: any = null
  isLoading: boolean = false;
  DATA: any = null
  ERROR: any = null
  constructor(private user: UserService, private router: Router, private basics: BasicsService, private blogs_Topics: BlogsAndTopicService, private activatedRoute: ActivatedRoute) {
    this.token = this.user.getJwt()

    this.activatedRoute.params.subscribe((params: Params) => {
      this.bid = params.bid
      if (this.bid) this.getBlogData()
    });
    this.QuillIcons()
  }


  ngOnInit(): void {
  }


  getBlogData() {
    if (this.isLoading) return
    if (!this.token) {
      this.basics.alert('🔑 You need to login first!')
      this.router.navigateByUrl('/login')
      return
    }

    this.isLoading = true;
    this.blogs_Topics.myOneBlogs(this.bid).subscribe((o: any) => {
      console.log(o)
      this.DATA = o.data
      this.innerHtml = this.DATA.innerHtml
      this.innerText = this.DATA.innerText
      this.imageUrl = this.DATA.imgUrl
      this.default_note = this.DATA.innerHtml
      // console.log(this.innerHtml)
      this.isLoading = false;
    }, (x: any) => {
      this.isLoading = false;
      if ([400, 404].includes(x.status)) {
        this.ERROR = {
          status: x.status,
          message: x.error.message
        }
        return
      }
      this.handel.networkError(x)
    })
  }



  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'link', 'image'],                    // toggled buttons
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],                      // dropdown with defaults from theme
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],                    //headers
    ]
  };



  QuillIcons() {
    icons['align'][''] = '<i class="fas fa-align-left"></i>';
    icons['align']['center'] = '<i class="fas fa-align-center"></i>';
    icons['align']['right'] = '<i class="fas fa-align-right"></i>';
    icons['align']['justify'] = '<i class="fas fa-align-justify"></i>';
    //
    //
    icons['bold'] = '<i class="fas fa-bold"></i>';
    //
    icons['code'] = '<i class="fas fa-code"></i>';
    icons['code-block'] = '<i class="fas fa-code"></i>';
    //
    //
    icons['italic'] = '<i class="fas fa-italic"></i>';
    icons['image'] = '<i class="far fa-image"></i>';
    icons['indent']['+1'] = '<i class="fas fa-indent"></i>';
    icons['indent']['-1'] = '<i class="fas fa-outdent"></i>';
    icons['link'] = '<i class="fas fa-link"></i>';
    icons['list']['ordered'] = '<i class="fas fa-list-ol"></i>';
    icons['list']['bullet'] = '<i class="fas fa-list-ul"></i>';

    icons['script']['sub'] = '<i class="fas fa-subscript"></i>';
    icons['script']['super'] = '<i class="fas fa-superscript"></i>';

    icons['strike'] = '<i class="fas fa-strikethrough"></i>';
    icons['underline'] = '<i class="fas fa-underline"></i>';
    icons['video'] = '<i class="fas fa-film"></i>';

  }


  /**
   * 
   * 
   * 
   * 
   * 
   */

  GetInnerData(event: any): any {
    this.innerHtml = event.editor.root.innerHTML
    this.innerText = event.editor.root.innerText
    this.imageUrl = this.getFirstImg(event.editor.editor.delta.ops)
  }

  getFirstImg(arr: any) {
    try {
      for (let e of arr) {
        if (e.insert.image) return e.insert.image
      }
      return null
    } catch (e: any) {
      return e
    }

  }

  isEmpty(text: any, min: number = 0) {
    let evn = text.split('\n')
    evn = evn.join('')
    // console.log(evn.trim().length)
    if (evn.trim().length <= min) return true
    return false
  }

  publish() {
    if (this.isEmpty(this.innerText, 250)) return this.basics.alert('For publishing, you need a minimum of 250 characters!')
    const obj = {
      innerHtml: this.innerHtml,
      innerText: this.innerText,
      imgUrl: this.imageUrl,
      blogId: this.bid || null,
      title: this.DATA ? this.DATA.title : "",
      topic: this.DATA ? this.DATA.topic : ""
    }
    this.blogs_Topics.publishBlogPopupAction(obj)
  }

  ngOnDestroy(): void {
    this.blogs_Topics.publishBlogPopupAction(null)
  }

}
