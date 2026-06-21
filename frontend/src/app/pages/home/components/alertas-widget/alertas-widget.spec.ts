import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasWidget } from './alertas-widget';

describe('AlertasWidget', () => {
  let component: AlertasWidget;
  let fixture: ComponentFixture<AlertasWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertasWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertasWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
