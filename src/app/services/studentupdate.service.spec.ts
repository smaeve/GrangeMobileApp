import { TestBed } from '@angular/core/testing';

import { StudentupdateService } from './studentupdate.service';

describe('StudentupdateService', () => {
  let service: StudentupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
