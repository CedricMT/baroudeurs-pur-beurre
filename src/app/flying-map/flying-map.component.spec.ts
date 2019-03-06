import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyingMapComponent } from './flying-map.component';

describe('FlyingMapComponent', () => {
  let component: FlyingMapComponent;
  let fixture: ComponentFixture<FlyingMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyingMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
