import { TestBed } from '@angular/core/testing';

import { DatabaseManagerService } from './database-manager.service';

describe('DatabaseManagerService', () => {
  let service: DatabaseManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
