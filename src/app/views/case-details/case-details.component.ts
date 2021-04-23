import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasesDetails } from '../../models/casesDetails.interface';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export class CaseDetailsComponent implements OnInit {

  caseDetail: CasesDetails[];
  empty = false;
  page: number = 0;
  orderId = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PanelService,
  ) {
    this.activatedRoute?.paramMap.subscribe(
      (params) => {
        this.orderId = params.get('orderId');
        this.service.getCases(this.orderId).subscribe(
          (resp: any) => {
            if (resp.hasOwnProperty('message')) {
              this.empty = true;
            } else {
              this.empty = false;
              this.caseDetail = resp.records;
              console.log(this.caseDetail);
            }
          }
        );
      }
    );
  }

  ngOnInit(): void {
  }

}
