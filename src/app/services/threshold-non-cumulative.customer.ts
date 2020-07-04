import { CircleTurnService } from './circle-turn.service';

export function checkinAll2(staffs, service: CircleTurnService) {
  service.checkinStaff(staffs[1].id);
  service.checkinStaff(staffs[2].id);
  service.checkinStaff(staffs[3].id);
  return service.caculatePrioritize(service.staffArrays);
}

// solution 2 - Khach 1 => id service la 1
export function s2k1(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[1].id, 'add', {
    id: 1,
    price: 7
  });
  staffs = service.caculatePrioritize(staffs);
  return staffs
}

// solution 2 - Khach 2 => id service la 2
export function s2k2(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[1].id, 'add', {
    id: 2,
    price: 15
  });
  staffs = service.caculatePrioritize(staffs);
  return staffs
}
