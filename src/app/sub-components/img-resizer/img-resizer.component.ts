import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-img-resizer',
  templateUrl: './img-resizer.component.html',
  styleUrls: ['./img-resizer.component.scss']
})
export class ImgResizerComponent implements OnInit {

  @Input() rawImg: any = null
  @Output() cropView: any = new EventEmitter<string>();

  cropImgPreview: any = '';

  ngOnInit() { }


  cropImg(e: any) {
    this.cropImgPreview = e.base64;
  }


  saveCrop() {
    // console.log(this.cropImgPreview)
    this.cropView.emit(this.cropImgPreview);
  }

  close() {
    this.cropView.emit(null);
  }


  // ----------------------------------------

  imgLoad() {
    // display cropper tool
  }

  initCropper() {
    // init cropper
  }

  imgFailed() {
    // error msg
  }

}
