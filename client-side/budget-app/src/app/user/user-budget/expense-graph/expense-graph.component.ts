import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { budgetData } from '../user-budget.component';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-expense-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-graph.component.html',
  styleUrl: './expense-graph.component.css'
})
export class ExpenseGraphComponent implements OnInit {
  @Input() expenseTotal = 0;
  @Input() categoryName = '';
  @Input() categoryData: budgetData[] = [];

  public categoryTotal = 0;
  public percentageOfTotalExpenses = 0;

  chart: any;

  ngOnInit(): void {
    this.categoryTotal = this.categoryData.reduce((acc, item) => acc + item.value, 0);
    if (this.expenseTotal == 0) {
      this.percentageOfTotalExpenses = 0;
    } else {
      this.percentageOfTotalExpenses = Math.round((this.categoryTotal / this.expenseTotal) * 100);
    }
  }
}
