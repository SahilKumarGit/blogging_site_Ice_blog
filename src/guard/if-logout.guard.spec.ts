import { TestBed } from '@angular/core/testing';

import { IfLogoutGuard } from './if-logout.guard';

describe('IfLogoutGuard', () => {
  let guard: IfLogoutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IfLogoutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
