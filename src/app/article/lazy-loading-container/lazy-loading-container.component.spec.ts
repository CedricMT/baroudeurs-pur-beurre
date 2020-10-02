import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyLoadingContainerComponent } from './lazy-loading-container.component';

describe('LazyLoadingContainerComponent', () => {
  let component: LazyLoadingContainerComponent;
  let fixture: ComponentFixture<LazyLoadingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyLoadingContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyLoadingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
