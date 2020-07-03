import { Component } from '@angular/core';
import { CircleTurnService } from './services/circle-turn.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  staffs = this.circleTurnService.staffs;
  constructor(private circleTurnService: CircleTurnService) { }
  customers = [];
  idStaff = 3;
  isAddCus: boolean;
  title = 'phuong-an-vong-tron';
  staffChose: any;

  updateView() {
    const { staffs, staffChose } = this.circleTurnService.updatePriority();
    this.staffs = staffs;
    this.staffChose = staffChose;
  }

  checkInNhanVien(id) {
    this.circleTurnService.checkinStaff(id);
    this.updateView();
  }

  changeTurn(id, type) {
    this.isAddCus = false;
    this.circleTurnService.updateTurn(id, type);
    this.updateView();
  }

  themNhanVien() {
    this.idStaff += 1;
    this.circleTurnService.add(this.idStaff);
    this.updateView();
  }


}
