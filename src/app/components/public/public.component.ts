import { Component, OnInit } from '@angular/core';
import { BasicsService } from 'src/services/basics/basics.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  screenWidth = window.innerWidth
  constructor(private basice: BasicsService) {
    this.basice.onScreenResize.subscribe((e: any) => this.screenWidth = e.target.innerWidth)
  }

  ngOnInit(): void {
  }

}
