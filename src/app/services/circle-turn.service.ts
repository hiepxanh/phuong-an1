import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CircleTurnService {
  staffs = {
  1: { id: 1, name: 'Nguyen A', checkIn: false, turn: 0, timecheckIn: 0, prioritize: 0 },
  2: { id: 2, name: 'Nguyen B', checkIn: false, turn: 0, timecheckIn: 0, prioritize: 0 },
  3: { id: 3, name: 'Nguyen C', checkIn: false, turn: 0, timecheckIn: 0, prioritize: 0 }
  };
  staffChose;
  customers = [];
  idCustomer = 0;

  get staffArrays() {
    return Object.values(this.staffs ?? {})
  }

  constructor() { }

  caculatePrioritize(staffs: any) {
    const objectByTurn = Object.values(staffs ?? {}).groupBy('turn');
    const objectByTurnSorted = objectByTurn.sortValueAsArray('desc', 'timecheckIn');
    const turns = Object.keys(objectByTurnSorted);
    const flatStaff1 = turns.sortByKey('desc', 'timecheckIn');
    const flatStaff2 = flatStaff1.map(key => objectByTurnSorted[key]);
    const flatStaff3 = flatStaff2.flat();
    const flatStaff4 = flatStaff3.map((staff, i) => ({ ...staff, prioritize: i + 1}));
    const flatArrayToObject = flatStaff4.arrayToObject('id');
    return flatArrayToObject
  }

  addPrioritize(staffCheckIn) {
    const flatArrayToObject = this.caculatePrioritize(Object.values(staffCheckIn));
    const values = Object.values(flatArrayToObject ?? {})
    for (const staff of values) {
      this.staffs[staff.id] = staff;
    }
    this.staffChose = values[0];
  }

  updatePriority() {
    const staffCheckin = (this.staffs as object).filterProperty('id', entity => entity.timecheckIn > 0);
    this.addPrioritize(staffCheckin);
    return {
      staffs: this.staffs,
      staffChose: this.staffChose
    }
  }

  update(id, staff) {
    this.staffs[id] = { ...staff};
    return this.staffs;
  }

  getEntity(id) {
    return { ...this.staffs[id] };
  }

  checkinStaff(id) {
    const staff = this.getEntity(id);
    if (staff.checkIn === false) {
      staff.checkIn = true;
      staff.timecheckIn = new Date();
    } else {
      staff.checkIn = false;
      staff.timecheckIn = 0;
      staff.prioritize = 0;
    }
    this.update(id, staff);
  }

  updateTurn(id, type: 'add' | 'delete', service?: any) {
    let staff = this.getEntity(id);
    if (staff.checkIn) {
      if (type === 'add') {
        staff = { ...staff, turn: staff.turn + 1 };
      } else if (type === 'delete') {
        staff = { ...staff, turn: staff.turn === 0 ? 0 : staff.turn - 1 };
      }
    }
    return this.update(id, staff);
  }

  updateHistory(id, type) {
    const staff = this.getEntity(id);
    if (staff.checkIn) {
      if (type === 'add') {
        this.idCustomer += 1;
        this.customers.push({ id: this.idCustomer, name: 'Khach Hang ' + this.idCustomer, staff: staff.name });
      }
    }
  }

  add(id) {
    this.staffs[id] = {
      id,
      name: 'Nhan Vien' + id,
      checkIn: false,
      turn: 0,
      timecheckIn: 0,
      prioritize: 0
    }
  }
}
