import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FivedayweatherComponent } from './fivedayweather.component';

describe('FivedayweatherComponent', () => {
  let component: FivedayweatherComponent;
  let fixture: ComponentFixture<FivedayweatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FivedayweatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FivedayweatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
