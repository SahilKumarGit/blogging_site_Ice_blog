import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingPupopComponent } from './publishing-pupop.component';

describe('PublishingPupopComponent', () => {
  let component: PublishingPupopComponent;
  let fixture: ComponentFixture<PublishingPupopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishingPupopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishingPupopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
