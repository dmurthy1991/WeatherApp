import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherlistComponent } from './weatherlist.component';

describe('WeatherlistComponent', () => {
  let component: WeatherlistComponent;
  let fixture: ComponentFixture<WeatherlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
