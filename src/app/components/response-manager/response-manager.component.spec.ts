import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseManagerComponent } from './response-manager.component';

describe('ResponseManagerComponent', () => {
  let component: ResponseManagerComponent;
  let fixture: ComponentFixture<ResponseManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
