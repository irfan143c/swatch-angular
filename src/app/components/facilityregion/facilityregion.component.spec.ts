import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityregionComponent } from './facilityregion.component';

describe('FacilityregionComponent', () => {
  let component: FacilityregionComponent;
  let fixture: ComponentFixture<FacilityregionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityregionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityregionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
