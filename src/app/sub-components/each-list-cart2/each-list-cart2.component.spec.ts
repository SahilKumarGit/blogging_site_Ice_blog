import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachListCart2Component } from './each-list-cart2.component';

describe('EachListCart2Component', () => {
  let component: EachListCart2Component;
  let fixture: ComponentFixture<EachListCart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachListCart2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachListCart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
