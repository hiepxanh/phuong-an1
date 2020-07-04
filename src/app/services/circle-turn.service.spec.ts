import { TestBed } from '@angular/core/testing';

import { CircleTurnService } from './circle-turn.service';
import { AppModule } from '../app.module';
import { k1, k2, deleteK2, checkinAll } from './circle-turn.customer';

describe('CircleTurnService', () => {
  let service: CircleTurnService;
  let staffs;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    service = new CircleTurnService();
    staffs = service.staffs;
    staffs = checkinAll(staffs, service);
  });

  it('should be created', () => {
    // const service: CircleTurnService = TestBed.get(CircleTurnService);
    expect(service).toBeTruthy();
  });

  it('3 staff should check in', () => {
    expect(service.staffs[1].checkIn).toBeTrue();
    expect(service.staffs[2].checkIn).toBeTrue();
    expect(service.staffs[3].checkIn).toBeTrue();
  });

  it('add turn 1 to staff 1', () => {
    staffs = service.updateTurn(staffs[1].id, 'add');
    // console.log('staffs', staffs, service.staffs[1].turn === 1);
    expect(staffs[1].turn).toBe(1);
  });

  it('K0', () => {
    // console.log(staffs);
    expect(staffs[1].prioritize).toBe(1);
    expect(staffs[2].prioritize).toBe(2);
    expect(staffs[3].prioritize).toBe(3);
  });

  it('K1', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    expect(staffs[1].prioritize).toBe(3);
    expect(staffs[2].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(2);
  });

  it('K2', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);

    expect(staffs[1].prioritize).toBe(2);
    expect(staffs[2].prioritize).toBe(3);
    expect(staffs[3].prioritize).toBe(1);
  });

  it('KDelete', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = deleteK2(staffs, service);
    expect(staffs[1].prioritize).toBe(3);
    expect(staffs[2].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(2);
  });
});
