import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CircleTurnService {
  staffs = {
  1: { id: 1, name: 'Nguyen A', isCheckIn: false, turn: 0, timecheckIn: 0, prioritize: 0 },
  2: { id: 2, name: 'Nguyen B', isCheckIn: false, turn: 0, timecheckIn: 0, prioritize: 0 },
  3: { id: 3, name: 'Nguyen C', isCheckIn: false, turn: 0, timecheckIn: 0, prioritize: 0 }
  };
  staffChose;
  customers = [];
  idCustomer = 0;

  get staffArrays() {
    return Object.values(this.staffs ?? {}) as any[]
  }

  constructor() { }

  caculatePrioritize(staffs: any) {
    const objectByTurn = Object.values(staffs ?? {}).groupBy('turn');
    const objectByTurnSorted = objectByTurn.sortValueAsArray('desc', 'timecheckIn');
    const turnKeys = Object.keys(objectByTurnSorted);
    const turnKeysDesc = turnKeys.sortByKey('asc');
    const staffArrays = turnKeysDesc.map(turnNumber => objectByTurnSorted[turnNumber]);
    let startPrioritize = 1;
    const flatStaff3 = staffArrays.map((staffsByTurn) => {
      const { staffsResult, currentPrioritize } = this.prioritizeIfCheckin(staffsByTurn, startPrioritize);
      startPrioritize = currentPrioritize;
      return staffsResult;
    }).flat();
    const flatStaff4 = flatStaff3.sortByKey('asc','prioritize');
    const flatArrayToObject = flatStaff4.arrayToObject('id');
    return flatArrayToObject
  }

  prioritizeIfCheckin(staffs, currentPrioritize) {
    staffs = staffs.map((staff, i) => {
      if (staff.isCheckIn) {
        staff = { ...staff, prioritize: currentPrioritize };
        currentPrioritize++
      } else {
        staff = { ...staff, prioritize: 0 };
      }
      return staff;
    });
    return { staffsResult: staffs, currentPrioritize }
  }

  addPrioritize(staffCheckIn) {
    const flatArrayToObject = this.caculatePrioritize(Object.values(staffCheckIn));
    const values:any[] = Object.values(flatArrayToObject ?? {})
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
    if (staff.isCheckIn === false) {
      staff.isCheckIn = true;
      staff.timecheckIn = new Date();
    } else {
      staff.isCheckIn = false;
      staff.timecheckIn = 0;
      staff.prioritize = 0;
    }
    this.update(id, staff);
  }

  updateTurn(id, type: 'add' | 'delete', service?: any) {
    let staff = this.getEntity(id);
    if (staff.isCheckIn) {
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
    if (staff.isCheckIn) {
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
