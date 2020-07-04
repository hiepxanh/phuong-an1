import { TestBed } from '@angular/core/testing';

import { CircleTurnService } from './circle-turn.service';
import { AppModule } from '../app.module';

describe('CircleTurnService', () => {
  let service: CircleTurnService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    service = new CircleTurnService();
    const staffs = service.staffs;
    service.checkinStaff(staffs[1].id);
    service.checkinStaff(staffs[2].id);
    service.checkinStaff(staffs[3].id);
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

  it('staff prioritize should order correctly', () => {
    expect(service.staffs[1].prioritize).toBe(1);
    expect(service.staffs[2].prioritize).toBe(2);
    expect(service.staffs[3].prioritize).toBe(3);
  });

  it('add turn 1 to staff 1', () => {
    const staffs = service.staffs;
    service.updateTurn(staffs[1].id, 'add');
    console.log('staffs', staffs, service.staffs[1].turn === 1);
    expect(service.staffs[1].turn).toBe(1);
  });
});
