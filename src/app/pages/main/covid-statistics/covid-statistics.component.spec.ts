import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidStatisticsComponent } from './covid-statistics.component';

describe('CovidStatisticsComponent', () => {
  let component: CovidStatisticsComponent;
  let fixture: ComponentFixture<CovidStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
