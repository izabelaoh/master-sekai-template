import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationTypeComponent } from './vaccination-type.component';

describe('VaccinationTypeComponent', () => {
  let component: VaccinationTypeComponent;
  let fixture: ComponentFixture<VaccinationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
