import { TestBed } from '@angular/core/testing';

import { CreateResumeService } from './create-resume.service';

describe('CreateResumeService', () => {
  let service: CreateResumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateResumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
