import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-each-option',
  templateUrl: './each-option.component.html',
  styleUrls: ['./each-option.component.scss']
})
export class EachOptionComponent implements OnInit {
  @Input() option = {
    title:"Nav Button",
    icon:"fi fi-rr-cursor-finger"
  }
  constructor() { }

  ngOnInit(): void {
  }

}
