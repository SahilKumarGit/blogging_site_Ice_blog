import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachListCardComponent } from './each-list-card.component';

describe('EachListCardComponent', () => {
  let component: EachListCardComponent;
  let fixture: ComponentFixture<EachListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
