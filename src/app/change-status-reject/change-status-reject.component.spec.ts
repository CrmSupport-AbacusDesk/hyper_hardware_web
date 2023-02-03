import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusRejectComponent } from './change-status-reject.component';

describe('ChangeStatusRejectComponent', () => {
  let component: ChangeStatusRejectComponent;
  let fixture: ComponentFixture<ChangeStatusRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStatusRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStatusRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
