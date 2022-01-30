import { TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';

import { ProcessService } from '../../services/process.service';

describe('ProcessService', () => {
  let service: ProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    service = TestBed.inject(ProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
