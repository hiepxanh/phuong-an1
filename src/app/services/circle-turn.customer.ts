import { CircleTurnService } from './circle-turn.service';

export function checkinAll(staffs, service: CircleTurnService) {
  service.checkinStaff(staffs[1].id);
  service.checkinStaff(staffs[2].id);
  service.checkinStaff(staffs[3].id);
  return service.caculatePrioritize(service.staffs);
}

export function k1(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[1].id, 'add');
  staffs = service.caculatePrioritize(staffs);
  return staffs
}

export function k2(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[2].id, 'add');
  staffs = service.caculatePrioritize(staffs);
  return staffs
}
export function k3(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[3].id, 'add');
  staffs = service.caculatePrioritize(staffs);
  return staffs
}
export function k4(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[1].id, 'add');
  staffs = service.caculatePrioritize(staffs);
  return staffs
}
export function deleteKA(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[1].id, 'delete');
  staffs = service.caculatePrioritize(staffs);
  return staffs
}
export function deleteKB(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[2].id, 'delete');
  staffs = service.caculatePrioritize(staffs);
  return staffs
}
export function deleteKC(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[3].id, 'delete');
  staffs = service.caculatePrioritize(staffs);
  return staffs
}
export function k5(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[2].id, 'add');
  staffs = service.caculatePrioritize(staffs);
  return staffs
}
export function k6(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[2].id, 'add');
  staffs = service.caculatePrioritize(staffs);
  return staffs
}
export function k7(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[2].id, 'add');
  staffs = service.caculatePrioritize(staffs);
  return staffs
}
export function k8(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[1].id, 'add');
  staffs = service.caculatePrioritize(staffs);
  return staffs
}
export function k9(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[3].id, 'add');
  staffs = service.caculatePrioritize(staffs);
  return staffs
}

export function ClockOutStaffB(staffId, service: CircleTurnService) {
  service.checkinStaff(staffId);
   return service.caculatePrioritize(service.staffArrays);
 }


export function deleteK2(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[2].id, 'delete');
  staffs = service.caculatePrioritize(staffs);
  return staffs
}
