import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  staffs = {
  1: { id: 1, name: 'Nguyen A', checkIn: false, turn: 0, timecheckIn: 0, prioritize: 0 },
  2: { id: 2, name: 'Nguyen B', checkIn: false, turn: 0, timecheckIn: 0, prioritize: 0 },
  3: { id: 3, name: 'Nguyen C', checkIn: false, turn: 0, timecheckIn: 0, prioritize: 0 }
  };

  constructor() { }

  // caculateTurnMinMax(staffCheckIn: any[]) {
  //   const firstItem = staffCheckIn[0];
  //   let turnMin;
  //   let turnMax;
  //   staffCheckIn.reduce((previous, staff) => {
  //     turnMin = staff.turn <= previous.turnMin ? staff.turn : previous.turnMin;
  //     turnMax = staff.turn > previous.turnMax ? staff.turn : previous.turnMax;
  //     return { turnMin, turnMax }
  //   }, {
  //     turnMin: firstItem.turn,
  //     turnMax: firstItem.turn
  //   });

  //   return {
  //     turnMin, turnMax
  //   };
  // }

  caculatePrioritize(staffs: any[]) {
    const objectByTurn = staffs.groupBy('turn');
    const objectByTurnSorted = objectByTurn.sortValueAsArray('asc', 'timecheckIn');
    const turns = Object.keys(objectByTurnSorted);
    const flatStaff1 = turns.sortByKey('asc');
    const flatStaff2 = flatStaff1.map(key => objectByTurnSorted[key]);
    const flatStaff3 = flatStaff2.flat();
    const flatStaff4 = flatStaff3.map((staff, i) => ({ ...staff, prioritize: i + 1}));
    return flatStaff4
  }
}
