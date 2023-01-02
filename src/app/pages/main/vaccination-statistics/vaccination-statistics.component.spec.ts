import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationStatisticsComponent } from './vaccination-statistics.component';

describe('VaccinationStatisticsComponent', () => {
  let component: VaccinationStatisticsComponent;
  let fixture: ComponentFixture<VaccinationStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
