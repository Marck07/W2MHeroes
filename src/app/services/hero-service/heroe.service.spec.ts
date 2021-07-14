import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HeroeService } from './heroe.service';

describe('HeroeService', () => {
  let service: HeroeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.inject(HeroeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
