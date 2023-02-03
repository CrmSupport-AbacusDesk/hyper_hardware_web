import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponlogsComponent } from './couponlogs.component';

describe('CouponlogsComponent', () => {
  let component: CouponlogsComponent;
  let fixture: ComponentFixture<CouponlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
