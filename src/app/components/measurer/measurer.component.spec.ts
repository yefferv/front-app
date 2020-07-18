import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurerComponent } from './measurer.component';

describe('MeasurerComponent', () => {
  let component: MeasurerComponent;
  let fixture: ComponentFixture<MeasurerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
