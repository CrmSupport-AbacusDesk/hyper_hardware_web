import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlargefeedbackimgComponent } from './enlargefeedbackimg.component';

describe('EnlargefeedbackimgComponent', () => {
  let component: EnlargefeedbackimgComponent;
  let fixture: ComponentFixture<EnlargefeedbackimgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnlargefeedbackimgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlargefeedbackimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
