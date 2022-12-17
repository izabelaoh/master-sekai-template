import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoComponent } from './personal.component';

describe('PersonalComponent', () => {
	let component: PersonalInfoComponent;
	let fixture: ComponentFixture<PersonalInfoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PersonalInfoComponent]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PersonalInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
