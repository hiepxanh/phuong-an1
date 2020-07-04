import { CircleTurnService } from './circle-turn.service';

export function checkinAll(staffs, service: CircleTurnService) {
  service.checkinStaff(staffs[1].id);
  service.checkinStaff(staffs[2].id);
  service.checkinStaff(staffs[3].id);
  return service.caculatePrioritize(service.staffArrays);
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

export function deleteK2(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[2].id, 'delete');
  staffs = service.caculatePrioritize(staffs);
  return staffs
}
