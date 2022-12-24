import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationConfirmationComponent } from './vaccination-confirmation.component';

describe('VaccinationConfirmationComponent', () => {
  let component: VaccinationConfirmationComponent;
  let fixture: ComponentFixture<VaccinationConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
