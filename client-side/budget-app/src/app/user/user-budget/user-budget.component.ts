import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { UserBudgetResponseDto } from '../../_interfaces/response/UserBudgetResponseDto.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { Sort, MatSortModule } from '@angular/material/sort';
import { ExpenseGraphComponent } from './expense-graph/expense-graph.component';
import * as dk from './expenseDataKeys';

export interface budgetData {
  key: string;
  value: number;
}

@Component({
  selector: 'app-user-budget',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    ExpenseGraphComponent,
  ],
  templateUrl: './user-budget.component.html',
  styleUrl: './user-budget.component.css'
})
export class UserBudgetComponent implements OnInit {
  public isUserAuthenticated: boolean = false;
  public auth: boolean = false;
  public hasBudget: boolean = false;
  public budget!: UserBudgetResponseDto;

  public totalExp: number = 0;
  public totalIncome: number = 0;

  public expensesBudgetArray: budgetData[] = [];
  public incomeBudgetArray: budgetData[] = [];
  public sortedExpenses: budgetData[] = [];
  public sortedIncome: budgetData[] = [];

  public householdBills: budgetData[] = [];
  public householdUtilities: budgetData[] = [];
  public livingCosts: budgetData[] = [];
  public pets: budgetData[] = [];
  public insurance: budgetData[] = [];
  public bankingAndInvestments: budgetData[] = [];
  public travelAndLeisure: budgetData[] = [];
  public friendsAndFamily: budgetData[] = [];

  constructor(
    private authService: AuthenticationService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {
    const localStorage = document.defaultView?.localStorage;
    if (localStorage) {
      this.auth = true;
    }
    this.sortedExpenses = this.expensesBudgetArray.slice();
    this.sortedIncome = this.incomeBudgetArray.slice();
  }
  ngOnInit(): void {
    if (this.auth) {
      this.isUserAuthenticated = this.authService.isUserAuthenticated();
    }
    if (this.isUserAuthenticated) {
      let ue = localStorage.getItem('email')?.toString()
      if (ue) {
        let address = 'api/accounts/budget/' + ue
        this.authService.getBudget(address).subscribe({
          next: (res: UserBudgetResponseDto) => {
            this.hasBudget = true;
            this.budget = res;
            this.totalExp = Object.entries(this.budget).reduce((total, [key, value]) => {
              if (key === 'paymentTotal') {
                return value;
              }
              return total;
            }, 0);
            this.totalIncome = Object.entries(this.budget).reduce((total, [key, value]) => {
              if (key === 'incomeTotal') {
                return value;
              }
              return total;
            }, 0);

            const paymentEntries = Object.entries(this.budget).filter(([key, _]) =>
              key.startsWith('payment') && key !== 'paymentTotal').map(([key, value]) =>
                [key.substring('payment'.length), value]);
            for (let i = 0; i < paymentEntries.length; i++) {
              let tmp: budgetData = {
                key: paymentEntries[i][0],
                value: paymentEntries[i][1]
              }
              this.expensesBudgetArray.push(tmp);
            }

            const incomeEntries = Object.entries(this.budget).filter(([key, _]) =>
              key.startsWith('income') && key !== 'incomeTotal').map(([key, value]) =>
                [key.substring('income'.length), value]);
            for (let i = 0; i < incomeEntries.length; i++) {
              let tmp: budgetData = {
                key: incomeEntries[i][0],
                value: incomeEntries[i][1]
              }
              this.incomeBudgetArray.push(tmp);
            }

            this.sortExpensesData({ active: '', direction: 'asc' });
            this.sortIncomeData({ active: '', direction: 'asc' });
            
            this.groupExpenseData(dk.BankingandInvestments, this.bankingAndInvestments);
            this.groupExpenseData(dk.FriendsAndFamily, this.friendsAndFamily);
            this.groupExpenseData(dk.HouseholdBillsKeys, this.householdBills);
            this.groupExpenseData(dk.HouseholdUtilities, this.householdUtilities);
            this.groupExpenseData(dk.Insurance, this.insurance);
            this.groupExpenseData(dk.LivingCosts, this.livingCosts);
            this.groupExpenseData(dk.Pets, this.pets);
            this.groupExpenseData(dk.TravelandLeisure, this.travelAndLeisure);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        });
      }
    }
  }

  groupExpenseData(categoryKeys: string[], d: budgetData[]){
    Object.entries(this.budget).forEach(([key, value]) => {
      if (categoryKeys.includes(key)) {
        d.push({
          key: key.substring('payment'.length),
          value
        });
      }
    });
  }

  sortExpensesData(sort: Sort) {
    const data = this.expensesBudgetArray.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedExpenses = data;
      return;
    }
    this.sortedExpenses = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(a.value, b.value, isAsc);
    });
  }

  sortIncomeData(sort: Sort) {
    const data = this.incomeBudgetArray.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedIncome = data;
      return;
    }
    this.sortedIncome = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(a.value, b.value, isAsc);
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  editBudget () {
    this.router.navigate(["/budget-planner"]);
  }
}
