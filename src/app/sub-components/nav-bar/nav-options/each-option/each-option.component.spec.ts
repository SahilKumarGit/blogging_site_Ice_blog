import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachOptionComponent } from './each-option.component';

describe('EachOptionComponent', () => {
  let component: EachOptionComponent;
  let fixture: ComponentFixture<EachOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
