import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRenderComponent } from './test-render.component';

describe('TestRenderComponent', () => {
  let component: TestRenderComponent;
  let fixture: ComponentFixture<TestRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
