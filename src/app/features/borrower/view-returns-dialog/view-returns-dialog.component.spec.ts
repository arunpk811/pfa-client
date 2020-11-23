import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReturnsDialogComponent } from './view-returns-dialog.component';

describe('ViewReturnsDialogComponent', () => {
  let component: ViewReturnsDialogComponent;
  let fixture: ComponentFixture<ViewReturnsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReturnsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReturnsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
