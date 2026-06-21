import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldosList } from './saldos-list';

describe('SaldosList', () => {
  let component: SaldosList;
  let fixture: ComponentFixture<SaldosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaldosList],
    }).compileComponents();

    fixture = TestBed.createComponent(SaldosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
