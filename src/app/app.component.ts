import { Component, OnInit } from '@angular/core';
import { CircleTurnService } from './services/circle-turn.service';
import { ThresholdNonCumulativeService } from './services/threshold-non-cumulative.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title;
  methodMode;
  idStaff = 3;
  customers = [];
  isAddCus: boolean;
  staffChose: any;
  method: any;
  staffs = [];
  idService = 0;
  threshold = this.thresholdNonCumulative.threshold;
  constructor(
    private circleTurnService: CircleTurnService,
    private thresholdNonCumulative: ThresholdNonCumulativeService,
  ) {
    this.changeMethod('circle');
    this.staffs = this.method.staffs;
  }

  ngOnInit() {
  }

  updateView() {
    const { staffs, staffChose } = this.method.updatePriority();
    this.staffs = staffs;
    this.staffChose = staffChose;
  }

  checkInNhanVien(id) {
    this.method.checkinStaff(id);
    this.updateView();
  }

  changeTurn(id, type) {
    this.isAddCus = false;
    switch (this.methodMode) {
      case 'circle':
        this.method.updateTurn(id, type);
        break;
      case 'threshold-non-cumulative':
        if (type === 'add') {
          const paidMoney = prompt('How much this customer will pay for this turn?:', '10');
          this.method.updateTurn(id, type, {
            id: ++this.idService,
            price: +paidMoney
          });
        } else {
          const serviceId = prompt('enter service id want to delete', '10');
          this.method.updateTurn(id, type, {
            id: serviceId,
            price: 0
          });
        }
        break;
      default:
        break;
    }

    this.updateView();
  }

  themNhanVien() {
    this.idStaff += 1;
    this.method.add(this.idStaff);
    this.updateView();
  }

  changeMethod(method) {
    this.methodMode = method;
    switch (method) {
      case 'circle':
        this.title = 'Phương án 1: Simple Circulation';
        this.method = this.circleTurnService;
        break;
      case 'threshold-non-cumulative':
        this.title = 'Phương án 2: Circulation with Earning Threshold - Non-cumulative';
        this.method = this.thresholdNonCumulative;
        break;
      default:
        break;
    }
  }


}
