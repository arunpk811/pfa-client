import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewloansgivenComponent } from './viewloansgiven.component';

describe('ViewloansgivenComponent', () => {
  let component: ViewloansgivenComponent;
  let fixture: ComponentFixture<ViewloansgivenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewloansgivenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewloansgivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
