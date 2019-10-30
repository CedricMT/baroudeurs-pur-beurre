import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCountryMapComponent } from './modal-country-map.component';

describe('ModalCountryMapComponent', () => {
  let component: ModalCountryMapComponent;
  let fixture: ComponentFixture<ModalCountryMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCountryMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCountryMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
