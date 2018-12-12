import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitytypeComponent } from './facilitytype.component';

describe('FacilitytypeComponent', () => {
  let component: FacilitytypeComponent;
  let fixture: ComponentFixture<FacilitytypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitytypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
