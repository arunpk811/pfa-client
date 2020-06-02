import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewloansComponent } from './viewloans.component';

describe('ViewloansComponent', () => {
  let component: ViewloansComponent;
  let fixture: ComponentFixture<ViewloansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewloansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewloansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
