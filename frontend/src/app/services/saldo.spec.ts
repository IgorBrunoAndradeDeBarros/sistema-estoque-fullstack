import { TestBed } from '@angular/core/testing';

import { Saldo } from './saldo';

describe('Saldo', () => {
  let service: Saldo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Saldo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
