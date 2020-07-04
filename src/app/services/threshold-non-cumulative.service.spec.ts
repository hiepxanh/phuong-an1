import { TestBed } from '@angular/core/testing';

import { ThresholdNonCumulativeService } from './threshold-non-cumulative.service';
import { AppModule } from '../app.module';
import { checkinAll2, s2k1, s2k2 } from './threshold-non-cumulative.customer';

describe('ThresholdNonCumulativeService', () => {
  let service: ThresholdNonCumulativeService;
  let staffs;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    service = new ThresholdNonCumulativeService();
    staffs = service.staffs;
    staffs = checkinAll2(staffs, service);
  });

  it('k0', () => {
    expect(staffs[1].prioritize).toBe(1);
    expect(staffs[2].prioritize).toBe(2);
    expect(staffs[3].prioritize).toBe(3);
  })

  it('s2k1', () => {
    staffs = s2k1(staffs, service);
    expect(staffs[1].prioritize).toBe(1);
    expect(staffs[2].prioritize).toBe(2);
    expect(staffs[3].prioritize).toBe(3);
  })

  it('s2k2', () => {
    staffs = s2k1(staffs, service);
    staffs = s2k2(staffs, service);
    expect(staffs[1].prioritize).toBe(3);
    expect(staffs[2].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(2);
  })

});
