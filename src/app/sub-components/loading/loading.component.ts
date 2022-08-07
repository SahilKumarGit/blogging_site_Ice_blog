import { Component, OnInit } from '@angular/core';
import { BasicsService } from 'src/services/basics/basics.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isLoading = false
  constructor(private basic: BasicsService) {
    this.basic.loadingStatus.subscribe(e => this.isLoading = e)
  }

  ngOnInit(): void { }

}
