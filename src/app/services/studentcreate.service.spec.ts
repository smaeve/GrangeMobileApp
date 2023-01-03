import { TestBed } from '@angular/core/testing';

import { StudentcreateService } from './studentcreate.service';

describe('StudentcreateService', () => {
  let service: StudentcreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentcreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
