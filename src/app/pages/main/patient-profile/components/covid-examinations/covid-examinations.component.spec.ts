import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidExaminationsComponent } from './covid-examinations.component';

describe('CovidExaminationsComponent', () => {
  let component: CovidExaminationsComponent;
  let fixture: ComponentFixture<CovidExaminationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidExaminationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidExaminationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
