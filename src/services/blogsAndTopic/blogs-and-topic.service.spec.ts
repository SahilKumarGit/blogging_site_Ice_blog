import { TestBed } from '@angular/core/testing';

import { BlogsAndTopicService } from './blogs-and-topic.service';

describe('BlogsAndTopicService', () => {
  let service: BlogsAndTopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogsAndTopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
