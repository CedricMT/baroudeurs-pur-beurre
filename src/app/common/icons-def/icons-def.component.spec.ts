import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsDefComponent } from './icons-def.component';

describe('IconsDefComponent', () => {
  let component: IconsDefComponent;
  let fixture: ComponentFixture<IconsDefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconsDefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
