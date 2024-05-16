import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
export enum Status {
  Over, Under, OnTarget
}
@Component({
  selector: 'app-expense-recommendation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-recommendation.component.html',
  styleUrl: './expense-recommendation.component.css'
})
export class ExpenseRecommendationComponent implements OnChanges {
  @Input() userExpense = 0;
  @Input() csoExpense = 0;
  @Input() expenseName = '';
  @Input() householdSize = '';

  public status = Status;
  public over = Status.OnTarget;
  public difference = 0;
  public householdText = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userExpense > this.csoExpense) {
      this.over = Status.Over;
    } else if (this.userExpense < this.csoExpense) {
      this.over = Status.Under;
    }
    else {
      this.over = Status.OnTarget;
    }
    this.getBackgroundColor()
    this.getDifference();
  }

  getBackgroundColor(): string {
    switch (this.over) {
      case Status.Over:
        return '#faacac';
      case Status.Under:
        return '#acfab2';
      default:
        return '#dfdae8';
    }
  }

  getDifference() {
    let d = this.csoExpense - this.userExpense;
    if (d < 0) {
      let x = d.toString();
      x = x.slice(1);
      d = parseFloat(x)
    }
    this.difference = parseFloat(d.toFixed(2))
  }
}
