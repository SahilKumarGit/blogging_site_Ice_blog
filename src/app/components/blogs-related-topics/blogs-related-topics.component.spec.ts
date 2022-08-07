import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsRelatedTopicsComponent } from './blogs-related-topics.component';

describe('BlogsRelatedTopicsComponent', () => {
  let component: BlogsRelatedTopicsComponent;
  let fixture: ComponentFixture<BlogsRelatedTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogsRelatedTopicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsRelatedTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
