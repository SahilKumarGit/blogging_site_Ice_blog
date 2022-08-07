import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgResizerComponent } from './img-resizer.component';

describe('ImgResizerComponent', () => {
  let component: ImgResizerComponent;
  let fixture: ComponentFixture<ImgResizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgResizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgResizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
