import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandel } from 'src/app/classes/error-handel';
import { BasicsService } from 'src/services/basics/basics.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  showOptions: boolean = false
  userInfo: any = {
    name: "No Name",
    profilePic: "/assets/image/user.png",
    _id: "000000000000000000000"
  }
  @Input() screenWidth: number = 0
  selectedVal: string = ""
  token: any = null


  constructor(private basic: BasicsService, private user: UserService, private router: Router) {
    this.basic.navSelectorStatus.subscribe(e => this.selectedVal = e)
    this.token = this.user.getJwt()
    this.user.userInfo.subscribe((e: any) => {
      this.userInfo = e
    })
  }

  ngOnInit(): void {
  }

  close() {
    this.showOptions = !true
  }

  open() {
    if (!this.token) {
      this.basic.alert('🔑 You need to login first!')
      this.router.navigateByUrl('/login')
    }
    this.showOptions = true
  }


}
