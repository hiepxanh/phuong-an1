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


export function s2k3(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[2].id, 'add', {
    id: 3,
    price: 10
  });
  staffs = service.caculatePrioritize(staffs);
  return staffs
}

// USE CAKE 1
export function s2k4(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[1].id, 'add', {
    id: 4,
    price: 5
  });
  staffs = service.caculatePrioritize(staffs);
  return staffs
}

// USE CAKE 2.1
export function s2k5a(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[1].id, 'add', {
    id: 5,
    price: 7
  });
  staffs = service.caculatePrioritize(staffs);
  return staffs
}

export function s2k6a(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[3].id, 'add', {
    id: 6,
    price: 14
  });
  staffs = service.caculatePrioritize(staffs);
  return staffs
}

// USE CAKE 2.2
export function s2k5b(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[3].id, 'add', {
    id: 7,
    price: 10
  });
  staffs = service.caculatePrioritize(staffs);
  return staffs
}


export function s2k6b(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[1].id, 'add', {
    id: 8,
    price: 5
  });
  staffs = service.caculatePrioritize(staffs);
  return staffs
}

// USE CAKE 3.1
export function xoaK2CuaA(staffs, service: CircleTurnService) {
  staffs = service.updateTurn(staffs[1].id, 'delete', {
    id: 9,
    price: 15
  });
  staffs = service.caculatePrioritize(staffs);
  return staffs
}