import { Component } from '@angular/core';
import { StaffService } from './services/staff.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  staffs = this.staffService.staffs;
  constructor(private staffService: StaffService) {}
  customers = [];
  idCustomer = 0;
  idStaff = 3;
  isAddCus: boolean;
  title = 'phuong-an-vong-tron';
  staffChose: any;
  isStaffChose: boolean;

  checkInNhanVien(id) {
    const staff = this.staffs[id];
    if (staff.checkIn === false) {
      staff.checkIn = true;
      staff.timecheckIn = Date.now();
    } else {
      staff.checkIn = false;
      staff.timecheckIn = 0;
      staff.prioritize = 0;
    }
    this.updatePriority();

  }

  changeTurn(id, type) {
      this.isAddCus = false;
      this.isStaffChose = true;
      this.idCustomer += 1;
      const staff = this.staffs[id];
      let newStaff;
      if (staff.checkIn) {
        if (type === 'add') {
          this.customers.push({ id: this.idCustomer, name: 'Khach Hang ' + this.idCustomer, staff: staff.name });
          newStaff = { ...staff, turn: staff.turn + 1 };
        } else if (type === 'delete') {
          newStaff = { ...staff, turn: staff.turn === 0 ? 0 : staff.turn - 1 };
        }
        this.staffs[id] = newStaff;
      }
      this.updatePriority();

  }

  updatePriority() {
    const staffCheckin = (this.staffs as object).filter('id', entity => entity.timecheckIn > 0);
    this.addPrioritize(staffCheckin);
  }

  themNhanVien() {
    this.idStaff += 1;
    this.staffs[this.idStaff] = {
      id: this.idStaff,
      name: 'Nhan Vien' + this.idStaff,
      checkIn: false,
      turn: 0,
      timecheckIn: 0,
      prioritize: 0
  }
  }

  private addPrioritize(staffCheckIn) {
    const checkinStaffNewUpdate = this.staffService.caculatePrioritize(Object.values(staffCheckIn));
    for (const staff of checkinStaffNewUpdate) {
      this.staffs[staff.id] = staff;
    }
    this.staffChose = checkinStaffNewUpdate[0];

  }
}
