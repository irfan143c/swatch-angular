import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyRolesComponent } from './survey-roles.component';

describe('SurveyRolesComponent', () => {
  let component: SurveyRolesComponent;
  let fixture: ComponentFixture<SurveyRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
