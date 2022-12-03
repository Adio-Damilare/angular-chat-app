import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApicallComponent } from './apicall.component';

describe('ApicallComponent', () => {
  let component: ApicallComponent;
  let fixture: ComponentFixture<ApicallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApicallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApicallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
