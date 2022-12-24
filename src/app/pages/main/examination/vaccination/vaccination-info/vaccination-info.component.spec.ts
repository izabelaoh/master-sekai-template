import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationInfoComponent } from './vaccination-info.component';

describe('VaccinationInfoComponent', () => {
  let component: VaccinationInfoComponent;
  let fixture: ComponentFixture<VaccinationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
