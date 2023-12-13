import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-budget-planner',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './budget-planner.component.html',
  styleUrl: './budget-planner.component.css'
})
export class BudgetPlannerComponent {
  income = new FormControl('');
}
