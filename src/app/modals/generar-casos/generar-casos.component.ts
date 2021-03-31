import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generar-casos',
  templateUrl: './generar-casos.component.html',
  styleUrls: ['./generar-casos.component.scss']
})
export class GenerarCasosComponent implements OnInit {
  caseForm: FormGroup;
  colorChecked = 'primary';

  constructor() { }

  ngOnInit(): void {
  }

}
