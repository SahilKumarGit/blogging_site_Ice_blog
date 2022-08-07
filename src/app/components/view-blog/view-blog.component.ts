import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { BlogsAndTopicService } from 'src/services/blogsAndTopic/blogs-and-topic.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {
  handel: ErrorHandel = new ErrorHandel(this.router, this.basic)
  DATA: any = null;
  error: any = null;
  deleteDialog: any = null
  token: any = null
  @ViewChild("isScroll") isScroll: any;
  userSubscription: Subscription | any;
  readData: string = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor inventore praesentium alias repudiandae in. Consequatur labore ipsum fuga neque beatae fugiat optio sunt facere, exercitationem eligendi molestiae ut quasi amet minus nam et, voluptates est debitis, sed cum quidem quas nesciunt? Aliquam necessitatibus vel fuga non, magni ad, ipsam quas qui velit cum deserunt explicabo perspiciatis vitae ut quam exercitationem. Iste explicabo quisquam facilis pariatur beatae est saepe eum modi corporis atque! Harum amet ipsum consectetur illo at obcaecati fugit in quae aperiam. Facilis vitae numquam tempora porro aspernatur reiciendis deleniti molestiae minima, voluptates aut atque, ipsum temporibus est sed saepe id esse delectus enim, dolorum nemo similique sunt. Eligendi ab iste incidunt nemo, sit laborum hic itaque corporis aspernatur quod, dolor quia maiores saepe perferendis esse suscipit. In cupiditate quibusdam esse consequatur temporibus adipisci magni. Aliquam cupiditate sint fugiat consequatur, debitis fugit expedita eligendi? Temporibus modi dolor vero, quam eveniet aperiam in, ab eius optio recusandae eaque atque molestiae delectus ipsam debitis adipisci maxime reiciendis doloremque aut excepturi laboriosam distinctio repellat? Reprehenderit similique id eligendi sunt officia autem quaerat iusto asperiores consequatur quod, minima vitae ratione nam, consequuntur aut voluptatum! Facilis dicta ea numquam quas excepturi praesentium repellendus in dignissimos dolor, mollitia, officiis laboriosam temporibus quibusdam deleniti ipsam, eum pariatur porro! Quia consequuntur amet nobis in. Vero odio corrupti sed reiciendis enim distinctio laboriosam sunt, voluptatibus nostrum dolorum perferendis deleniti similique ut fuga exercitationem fugiat illo ipsam modi inventore ratione? Ad repellat sit beatae nemo iure non velit dolorum eos possimus, illo deleniti nostrum ullam totam, ipsa facilis sunt molestias tenetur similique rerum maiores? Cumque dolores explicabo optio tempora corrupti, repellendus quas dicta doloremque aspernatur. Dignissimos reiciendis neque et adipisci veniam sunt quidem culpa, quos laboriosam eveniet quis praesentium quo a non commodi nisi perspiciatis autem libero cum quod voluptate. Ipsa accusamus ad recusandae sapiente aut ea, neque sint dicta quas corrupti nihil! Quidem aliquid, beatae rerum repellat molestias, quae consequuntur accusantium reprehenderit ab, nesciunt cumque autem. Et officiis ipsum aliquam, omnis repellat maxime ducimus architecto eius ab similique obcaecati aperiam ex, qui consectetur magnam libero debitis nihil tenetur, velit nemo. Aperiam molestias dolorem, quam repudiandae temporibus veritatis ullam ducimus, excepturi tenetur minus sed animi ipsa cupiditate aliquam praesentium? Expedita quod recusandae voluptatibus debitis repellendus officia repudiandae? Dolor iure facere explicabo enim incidunt vel quos quidem, in obcaecati architecto vitae repudiandae cum vero ipsum eaque inventore, nam delectus perspiciatis quo ea quasi ducimus amet. Laborum sed fugit delectus? Quia quaerat corporis incidunt, tempore dignissimos quibusdam ducimus neque minima numquam laboriosam porro, unde aut, molestiae suscipit enim totam provident maiores esse aspernatur. Repudiandae voluptatem incidunt, voluptatibus dolorem necessitatibus harum enim obcaecati eius quos, aspernatur tempore error! Voluptatum iure, placeat reprehenderit minima totam at nisi est? Laboriosam amet velit doloremque aliquid officiis, ullam eaque officia voluptatibus pariatur impedit! Quo, voluptatem reiciendis. Quisquam laborum iste adipisci esse ratione magni in fugit sunt perferendis consequuntur porro dolores, modi molestias alias? Facere voluptatem incidunt officia iusto sed dicta reiciendis in, debitis quas numquam molestias?"
  constructor(private activatedRoute: ActivatedRoute, private user: UserService, private basic: BasicsService, private blog_Topic: BlogsAndTopicService, private router: Router) {
    this.token = this.user.getJwt()

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getBlog(params.id)
    });
  }

  scrollTop(): void {
    this.isScroll.nativeElement.scrollTop = 0
  }

  getBlog(id: string) {
    this.blog_Topic.blogViewOne(id).subscribe((o: any) => {
      this.DATA = o.data
      console.log(this.DATA)
      this.scrollTop()
    }, (x: any) => {
      this.error = {
        status: x.status,
        message: x.error.message
      }
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
    this.basic.loadingAction(true)
    this.blog_Topic.removeBlog(this.DATA.current._id).subscribe((o: any) => {
      this.basic.alert(o.message)
      this.basic.loadingAction(false)
      this.router.navigateByUrl("")
    }, (x: any) => {
      this.basic.loadingAction(false)
      this.handel.networkError(x)
    })
  }

  makeBookMark() {
    if (!this.token) {
      this.basic.alert('🔑 You need to login first!')
      this.router.navigateByUrl('/login')
      return
    }
    this.basic.loadingAction(true)
    // able to add bookmark
    this.blog_Topic.addBookmark(this.DATA.current._id).subscribe((o: any) => {
      this.basic.loadingAction(false)
      this.basic.alert(o.message)
    }, (x: any) => {
      this.basic.loadingAction(false)
      this.handel.networkError(x)
    })
  }
}
