import { TestBed } from '@angular/core/testing';

import { FivedayweatherService } from './fivedayweather.service';

describe('FivedayweatherService', () => {
  let service: FivedayweatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FivedayweatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
