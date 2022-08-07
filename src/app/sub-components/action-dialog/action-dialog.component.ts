import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss']
})
export class ActionDialogComponent implements OnInit {
  @Output() ButtonClick = new EventEmitter<string>();
  @Input() DATA: any = null
  // {
  //   Heading: "Alert!",
  //   SubHeading: "All ok and continue.",
  //   Cancel:'Cancel',
  //   Ok:'Ok'
  // }
  constructor() { }

  ngOnInit(): void {
  }

  makeClick(data: string) {
    this.ButtonClick.emit(data)
  }

}
