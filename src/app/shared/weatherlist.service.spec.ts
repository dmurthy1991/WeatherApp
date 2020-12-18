import { TestBed } from '@angular/core/testing';

import { WeatherlistService } from './weatherlist.service';

describe('WeatherlistService', () => {
  let service: WeatherlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
