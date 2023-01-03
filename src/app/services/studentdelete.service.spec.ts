import { TestBed } from '@angular/core/testing';

import { StudentdeleteService } from './studentdelete.service';

describe('StudentdeleteService', () => {
  let service: StudentdeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentdeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
