import { Injectable } from '@angular/core';
import { CircleTurnService } from './circle-turn.service';

@Injectable({
  providedIn: 'root'
})
export class ThresholdNonCumulativeService extends CircleTurnService {
  staffs = {
    1: { id: 1, name: 'Nguyen A', checkIn: false, turn: 0, timecheckIn: 0, prioritize: 0,turnServices: {} },
    2: { id: 2, name: 'Nguyen B', checkIn: false, turn: 0, timecheckIn: 0, prioritize: 0,turnServices: {} },
    3: { id: 3, name: 'Nguyen C', checkIn: false, turn: 0, timecheckIn: 0, prioritize: 0,turnServices: {} }
  };
  threshold = 10;

  add(id) {
    this.staffs[id] = {
      id,
      name: 'Nhan Vien' + id,
      checkIn: false,
      turn: 0,
      timecheckIn: 0,
      prioritize: 0,
      turnServices: {},
    }
  }

  updateTurn(id, type: 'add' | 'delete', service?: any) {
    const staff = this.getEntity(id);
    if (staff.checkIn) {
      const newTurnServices = this.calculateTurnIncrease(staff, type, service);
      const totalTurns = this.calculateTotalTurnInHistory(newTurnServices);
      staff.turn = totalTurns.length;
      staff.turnServices = newTurnServices;
    }
    return this.update(id, staff);
  }

  calculateTurnIncrease(staff, type, service) {
    let turnServices = staff.turnServices;
    if (type === 'add') {
      turnServices[service.id] = {
        id: service.id,
        price: service.price,
        turn: staff.turn
      }
    } else if (type === 'delete') {
      const { [service.id]: dumb, ...pureTurnServices } = turnServices;
      turnServices = pureTurnServices;
    }
    return turnServices
  }


  calculateTotalTurnInHistory(turnServices) {
    const listServices = Object.values(turnServices ?? {});
    const turnKeyServiceValue = listServices.groupBy('turn');
    const turnKeyReducePriceValue = turnKeyServiceValue.reduceValueAsArrayByKey('price');
    const turnKeyTurnValidValue = turnKeyReducePriceValue.compareValueByFn(value => value >= this.threshold);
    const totalTurn = Object.values(turnKeyTurnValidValue ?? {}).filter(value => !!value);
    return totalTurn;
  }


}
