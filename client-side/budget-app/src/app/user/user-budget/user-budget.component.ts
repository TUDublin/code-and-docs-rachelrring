import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { UserBudgetResponseDto } from '../../_interfaces/response/UserBudgetResponseDto.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-budget',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
  ],
  templateUrl: './user-budget.component.html',
  styleUrl: './user-budget.component.css'
})
export class UserBudgetComponent implements OnInit {
  public isUserAuthenticated: boolean = false;
  public auth: boolean = false;
  public hasBudget: boolean = false;
  public budget!: UserBudgetResponseDto;
  public expensesDataSource!: MatTableDataSource<any>;
  public incomeDataSource!: MatTableDataSource<any>;
  displayedColumns = ['attribute', 'value'];

  constructor(
    private authService: AuthenticationService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {
    const localStorage = document.defaultView?.localStorage;
    if (localStorage) {
      this.auth = true;
    }
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
            console.log(res);
            this.hasBudget = true;
            this.budget = res;
            // this.dataSource = new MatTableDataSource<any>(Object.entries(this.budget).map(([key, value]) => ({ key: key, value: value })));
            // Filter the key-value pairs to include only those where the key starts with "payment"
            const paymentEntries = Object.entries(this.budget).filter(([key, _]) => key.startsWith('payment'));
            const incomeEntries = Object.entries(this.budget).filter(([key, _]) => key.startsWith('income'));
            // Map the filtered key-value pairs to an array of objects with 'key' and 'value' properties
            this.expensesDataSource = new MatTableDataSource<any>(
              paymentEntries.map(([key, value]) => ({ key: key, value: value }))
            );
            this.incomeDataSource = new MatTableDataSource<any>(
              incomeEntries.map(([key, value]) => ({ key: key, value: value }))
            );
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        });
      }
    }
  }
}
