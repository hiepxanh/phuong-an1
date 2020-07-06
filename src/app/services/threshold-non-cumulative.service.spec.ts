import { TestBed } from '@angular/core/testing';

import { ThresholdNonCumulativeService } from './threshold-non-cumulative.service';
import { AppModule } from '../app.module';
import { checkinAll2, s2k1, s2k2, s2k3, s2k4, s2k5a, s2k6a, s2k5b, s2k6b, deleteK2CuaA, deleteK1CuaA, ClockOutStaffBpa2, s2k7 } from './threshold-non-cumulative.customer';

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

  it('s2k3', () => {
    staffs = s2k1(staffs, service);
    staffs = s2k2(staffs, service);
    staffs = s2k3(staffs, service);
    expect(staffs[1].prioritize).toBe(2);
    expect(staffs[2].prioritize).toBe(3);
    expect(staffs[3].prioritize).toBe(1);
  })

  // USE CASE 1
  it('s2k4', () => {
    staffs = s2k1(staffs, service);
    staffs = s2k2(staffs, service);
    staffs = s2k3(staffs, service);
    staffs = s2k4(staffs, service);
    expect(staffs[1].prioritize).toBe(2);
    expect(staffs[2].prioritize).toBe(3);
    expect(staffs[3].prioritize).toBe(1);
  })

  // USE CASE 2.1
  it('s2k5a', () => {
    staffs = s2k1(staffs, service);
    staffs = s2k2(staffs, service);
    staffs = s2k3(staffs, service);
    staffs = s2k4(staffs, service);
    staffs = s2k5a(staffs, service);
    expect(staffs[1].prioritize).toBe(3);
    expect(staffs[2].prioritize).toBe(2);
    expect(staffs[3].prioritize).toBe(1);
  })

  it('s2k6a', () => {
    staffs = s2k1(staffs, service);
    staffs = s2k2(staffs, service);
    staffs = s2k3(staffs, service);
    staffs = s2k4(staffs, service);
    staffs = s2k5a(staffs, service);
    staffs = s2k6a(staffs, service);
    expect(staffs[1].prioritize).toBe(3);
    expect(staffs[2].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(2);
  })

  // USE CASE 2.2
  it('s2k5b', () => {
    staffs = s2k1(staffs, service);
    staffs = s2k2(staffs, service);
    staffs = s2k3(staffs, service);
    staffs = s2k4(staffs, service);
    staffs = s2k5b(staffs, service);
    expect(staffs[1].prioritize).toBe(1);
    expect(staffs[2].prioritize).toBe(2);
    expect(staffs[3].prioritize).toBe(3);
  })
  it('s2k6b', () => {
    staffs = s2k1(staffs, service);
    staffs = s2k2(staffs, service);
    staffs = s2k3(staffs, service);
    staffs = s2k4(staffs, service);
    staffs = s2k5b(staffs, service);
    staffs = s2k6b(staffs, service);
    expect(staffs[1].prioritize).toBe(3);
    expect(staffs[2].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(2);
  })

  // USE CASE 3.1
  it('DeleteK2A', () => {
    staffs = s2k1(staffs, service);   
    staffs = s2k2(staffs, service);   
    staffs = s2k3(staffs, service);
    staffs = s2k4(staffs, service);
    staffs = s2k5a(staffs, service);
    staffs = s2k6a(staffs, service);
    staffs = deleteK2CuaA(staffs, service);

    expect(staffs[1].prioritize).toBe(1);
    expect(staffs[2].prioritize).toBe(2);
    expect(staffs[3].prioritize).toBe(3);
  })
  it('DeleteK1A', () => {
    staffs = s2k1(staffs, service);   
    staffs = s2k2(staffs, service);   
    staffs = s2k3(staffs, service);
    staffs = s2k4(staffs, service);
    staffs = s2k5a(staffs, service);
    staffs = s2k6a(staffs, service);
    staffs = deleteK1CuaA(staffs, service);

    expect(staffs[1].prioritize).toBe(3);
    expect(staffs[2].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(2);
  })
  // USE CASE 4
  it('BClockOutpa2', () => {
    staffs = s2k1(staffs, service);   
    staffs = s2k2(staffs, service);   
    staffs = s2k3(staffs, service);
    staffs = s2k4(staffs, service);  
    staffs = s2k5a(staffs, service);
    staffs = s2k6a(staffs, service);

    staffs = ClockOutStaffBpa2(staffs[2].id, service);


    expect(staffs[1].prioritize).toBe(2);
    expect(staffs[3].prioritize).toBe(1);
    
  })
  it('s2k7', () => {
    staffs = s2k1(staffs, service);   
    staffs = s2k2(staffs, service);   
    staffs = s2k3(staffs, service);
    staffs = s2k4(staffs, service);  
    staffs = s2k5a(staffs, service);
    staffs = s2k6a(staffs, service);
    staffs = s2k7(staffs, service);

    staffs = ClockOutStaffBpa2(staffs[2].id, service);
    expect(staffs[1].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(2);
    
  })



  // USE CASE 5
  it('BClockIn', () => {
    staffs = s2k1(staffs, service);
    staffs = s2k2(staffs, service);
    staffs = s2k3(staffs, service);
    staffs = s2k4(staffs, service);
    staffs = s2k5a(staffs, service);
    staffs = s2k6a(staffs, service);
    staffs = s2k7(staffs, service);
    expect(staffs[1].prioritize).toBe(2);
    expect(staffs[2].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(3);
  })




});
