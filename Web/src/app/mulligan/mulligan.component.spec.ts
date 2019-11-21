import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulliganComponent } from './mulligan.component';

describe('MulliganComponent', () => {
  let component: MulliganComponent;
  let fixture: ComponentFixture<MulliganComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulliganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulliganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
