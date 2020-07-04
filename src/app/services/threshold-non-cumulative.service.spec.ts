import { TestBed } from '@angular/core/testing';

import { ThresholdNonCumulativeService } from './threshold-non-cumulative.service';
import { AppModule } from '../app.module';

describe('ThresholdNonCumulativeService', () => {
  let service: ThresholdNonCumulativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    service = new ThresholdNonCumulativeService();
    const staffs = service.staffs;
    service.checkinStaff(staffs[1].id);
    service.checkinStaff(staffs[2].id);
    service.checkinStaff(staffs[3].id);
  });

});
