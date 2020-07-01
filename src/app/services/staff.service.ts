import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor() { }

  genTimeStamp(): number {
    const d = new Date();
    return d.getTime();
  }
  caculateTurnMinMax(staffCheckIn: any[]) {
    const firstItem = staffCheckIn[0];
    let turnMin;
    let turnMax;
    // if (staffCheckIn.length > 0) {
    //   for (const nhanVien of staffCheckIn) {
    //     if (nhanVien.timecheckIn > 0) {
    //       if (turnMin) {
    //         if (nhanVien.turn < turnMin) {
    //           turnMin = nhanVien.turn;
    //         }
    //       } else {
    //         turnMin = nhanVien.turn;
    //       }
    //       if (turnMax) {
    //         if (nhanVien.turn > turnMax) {
    //           turnMax = nhanVien.turn;
    //         }
    //       } else {
    //         turnMax = nhanVien.turn;
    //       }
    //     }
    //   }
    // } else {
    //   turnMin = 0;
    //   turnMax = 0;
    // }

    staffCheckIn.reduce((previous, staff) => {
      turnMin = staff.turn <= previous.turnMin ? staff.turn : previous.turnMin;
      turnMax = staff.turn > previous.turnMax ? staff.turn : previous.turnMax;
      return { turnMin, turnMax }
    }, {
      turnMin: firstItem.turn,
      turnMax: firstItem.turn
    });

    return {
      turnMin, turnMax
    };
  }
  caculatePrioritize(turnMin, turnMax, staffCheckIn: any[]) {
    //   let result = [];
    //   if (staffCheckIn.length > 0) {
    //     const cloneNhanViens = [...staffCheckIn];
    //     cloneNhanViens.sort(this.compareValuesOfArray('turn'));
    //     for (let i = turnMin; i <= turnMax; i++) {
    //       const arrTurn = [];
    //       for (const nv of cloneNhanViens) {
    //         if (nv.turn === i) { arrTurn.push(nv); }
    //       }
    //       arrTurn.sort(this.compareValuesOfArray('timecheckIn'));
    //       result = result.concat(arrTurn);
    //     }


    //     result = result.map(s => {return {
    //       id: s.id,
    //       prioritize: result.indexOf(s) + 1
    //     }; });
    //   }
    //   return result;
    // }
    const objectByTurn = staffCheckIn.groupBy('turn');
    const objectByTurnSorted = objectByTurn.sortValueAsArray('desc', 'turn');
    const flatStaff = Object.keys(objectByTurnSorted);
    const flatStaff1 = flatStaff.sortByKey('asc');
    const flatStaff2 = flatStaff1.map(key => objectByTurnSorted[key]);
    const flatStaff3 = flatStaff2.flat();
    const flatStaff4 = flatStaff3.map((staff, i) => ({ ...staff, prioritize: i + 1}));
    return flatStaff4
  }
}
