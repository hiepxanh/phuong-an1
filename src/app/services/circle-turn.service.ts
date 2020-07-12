import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CircleTurnService {
  staffs = {
    1: { id: 1, staffName: 'Nguyen A', isIn: false, isOut: false, turn: 0, clockIn: 0, prioritize: 0 },
    2: { id: 2, staffName: 'Nguyen B', isIn: false, isOut: false, turn: 0, clockIn: 0, prioritize: 0 },
    3: { id: 3, staffName: 'Nguyen C', isIn: false, isOut: false, turn: 0, clockIn: 0, prioritize: 0 }
  };
  staffChose;
  customers: any[] = [];
  idCustomer = 0;

  get staffArrays() {
    return Object.values(this.staffs ?? {}) as any[]
  }

  constructor() { }

  caculatePrioritize(staffs: any) {
    const objectByTurn = Object.values(staffs ?? {}).groupBy('turn');
    const objectByTurnSorted = objectByTurn.sortValueAsArray('asc', 'clockIn');
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
    this.staffChose = flatStaff4[0];
    const flatArrayToObject = flatStaff4.arrayToObject('id');
    return flatArrayToObject
  }

  prioritizeIfCheckin(staffs, currentPrioritize) {
    // order by who came first
    staffs = staffs.sortByKey('asc','clockIn');
    staffs = staffs.map((staff, i) => {
      if (staff.isIn && staff.isOut !== true) {
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

  updatePriority(staffAttendanceData = this.staffs) {
    this.staffs = this.caculatePrioritize(staffAttendanceData) as any;
    console.log('this.staffs', this.staffs);
    return {
      staffs: this.staffs,
      staffChose: this.staffChose
    };
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
    if (staff.isIn === false) {
      staff.isIn = true;
      staff.clockIn = new Date();
    } else {
      staff.isIn = false;
      staff.clockIn = 0;
      staff.prioritize = 0;
    }
    return this.update(id, staff);
  }

  updateTurn(id, type: 'add' | 'delete' | 'keep', service?: any) {
    let staff = this.getEntity(id);
    if (staff.isIn) {
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
    if (staff.isIn) {
      if (type === 'add') {
        this.idCustomer += 1;
        this.customers.push({ id: this.idCustomer, staffName: 'Khach Hang ' + this.idCustomer, staff: staff.staffName });
      }
    }
  }

  add(id) {
    this.staffs[id] = {
      id,
      staffName: 'Nhan Vien' + id,
      checkIn: false,
      turn: 0,
      clockIn: 0,
      prioritize: 0
    }
  }
}
