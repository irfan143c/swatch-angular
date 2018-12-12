import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCategoriesComponent } from './question-categories.component';

describe('QuestionCategoriesComponent', () => {
  let component: QuestionCategoriesComponent;
  let fixture: ComponentFixture<QuestionCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
