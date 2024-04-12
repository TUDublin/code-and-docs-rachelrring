import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UserBudgetResponseDto } from '../../_interfaces/response/UserBudgetResponseDto.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-budget',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-budget.component.html',
  styleUrl: './user-budget.component.css'
})
export class UserBudgetComponent implements OnInit{
  public isUserAuthenticated: boolean = false;
  public auth:boolean = false;

  constructor(
    private authService: AuthenticationService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ){
    const localStorage = document.defaultView?.localStorage;
    if (localStorage){
      this.auth = true;
    }
  }
  ngOnInit(): void {
    if(this.auth){
      this.isUserAuthenticated = this.authService.isUserAuthenticated();
    }
    if (this.isUserAuthenticated){
      let ue = localStorage.getItem('email')?.toString()
      if (ue){
        let address = 'api/accounts/budget/'+ue
        this.authService.getBudget(address).subscribe({
          next: (res:UserBudgetResponseDto) => {
            console.log(res);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }})
      }
    }
  }
}
