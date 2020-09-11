import { TestBed } from '@angular/core/testing';

import { CircleTurnService } from './circle-turn.service';
import { AppModule } from '../app.module';
import { k1, k2, k3, k4, deleteKA, deleteKB, deleteKC, k5, k6, k7, k8, k9, deleteK2, checkinAll, ClockOutStaffB } from './circle-turn.customer';

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
    expect(service.staffs[1].isIn).toBeTrue();
    expect(service.staffs[2].isIn).toBeTrue();
    expect(service.staffs[3].isIn).toBeTrue();
  });

  it('add turn 1 to staff 1', () => {
    staffs = service.updateTurn(staffs[1].id, 'add');
    // console.log('staffs', staffs, service.staffs[1].turn === 1);
    expect(staffs[1].turn).toBe(1);
  });

  it('K0', () => {
    // console.log(staffs);
    // mong muốn: staff 1 phải có thuộc tính prioritize (thứ tự) bằng 1
    expect(staffs[1].prioritize).toBe(1);
    // mong muốn: staff 2 phải có thuộc tính prioritize (thứ tự) bằng 2
    expect(staffs[2].prioritize).toBe(2);
    // mong muốn: staff 3 phải có thuộc tính prioritize (thứ tự) bằng 3
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

  it('K3', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);

    expect(staffs[1].prioritize).toBe(1);
    expect(staffs[2].prioritize).toBe(2);
    expect(staffs[3].prioritize).toBe(3);
  });

  it('K4', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k4(staffs, service);

    expect(staffs[1].prioritize).toBe(3);
    expect(staffs[2].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(2);
  });

  it('DeleteTurnA', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k4(staffs, service);
    staffs = deleteKA(staffs, service);
    expect(staffs[1].prioritize).toBe(1);
    expect(staffs[2].prioritize).toBe(2);
    expect(staffs[3].prioritize).toBe(3);
  });

  it('DeleteTurnB', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k4(staffs, service);
    staffs = deleteKA(staffs, service);
    staffs = deleteKB(staffs, service);
    expect(staffs[1].prioritize).toBe(2);
    expect(staffs[2].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(3);
  });

  it('K5', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k4(staffs, service);
    staffs = deleteKA(staffs, service);
    staffs = deleteKB(staffs, service);
    staffs = k5(staffs, service);

    expect(staffs[1].prioritize).toBe(1);
    expect(staffs[2].prioritize).toBe(2);
    expect(staffs[3].prioritize).toBe(3);
  });

  // Gia su moi nguoi co 5 turn  (1)
  it('DeleteTurnBx2', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = deleteKB(staffs, service);
    staffs = deleteKB(staffs, service);
    expect(staffs[1].prioritize).toBe(2);
    expect(staffs[2].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(3);
  });

  it('DeleteTurnC', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = deleteKB(staffs, service);
    staffs = deleteKB(staffs, service);
    staffs = deleteKC(staffs, service);
    expect(staffs[1].prioritize).toBe(3);
    expect(staffs[2].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(2);
  });

  it('K6', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = deleteKB(staffs, service);
    staffs = deleteKB(staffs, service);
    staffs = deleteKC(staffs, service);
    staffs = k6(staffs, service);
    expect(staffs[1].prioritize).toBe(3);
    expect(staffs[2].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(2);
  });

    // Gia su moi nguoi co 5 turn  (2)
  it('K7', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k7(staffs, service);
    expect(staffs[1].prioritize).toBe(1);
    expect(staffs[2].prioritize).toBe(3);
    expect(staffs[3].prioritize).toBe(2);
  });

  // Gia su moi nguoi co 5 turn  (3)
  it('K8', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k8(staffs, service);
    expect(staffs[1].prioritize).toBe(3);
    expect(staffs[2].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(2);
  });

  it('ClockOutStaffB', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = ClockOutStaffB(staffs[2].id, service);
    staffs = k8(staffs, service);

    expect(staffs[1].prioritize).toBe(2);
    expect(staffs[3].prioritize).toBe(1);
  });
  it('K9', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = ClockOutStaffB(staffs[2].id, service);
    staffs = k8(staffs, service);
    staffs = k9(staffs, service);

    expect(staffs[1].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(2);
  });

  it('BClockIn', () => {
    // console.log(staffs);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k1(staffs, service);
    staffs = k2(staffs, service);
    staffs = k3(staffs, service);
    staffs = k8(staffs, service);
    staffs = k9(staffs, service);

    expect(staffs[1].prioritize).toBe(2);
    expect(staffs[2].prioritize).toBe(1);
    expect(staffs[3].prioritize).toBe(3);
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
