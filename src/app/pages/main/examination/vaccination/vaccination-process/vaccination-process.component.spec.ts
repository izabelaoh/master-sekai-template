import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationProcessComponent } from './vaccination-process.component';

describe('VaccinationProcessComponent', () => {
  let component: VaccinationProcessComponent;
  let fixture: ComponentFixture<VaccinationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
