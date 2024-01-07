import { Component, Input } from '@angular/core';
import { Employee } from 'src/app/employee.model';

@Component({
  selector: 'app-emp-card',
  templateUrl: './emp-card.component.html',
  styleUrls: ['./emp-card.component.css']
})
export class EmpCardComponent {

  @Input() employee: any;

}
