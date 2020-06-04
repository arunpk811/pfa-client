import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBorrowerComponent } from './view-borrower.component';

describe('ViewBorrowerComponent', () => {
  let component: ViewBorrowerComponent;
  let fixture: ComponentFixture<ViewBorrowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBorrowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBorrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
