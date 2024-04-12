import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-user-budget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-budget.component.html',
  styleUrl: './user-budget.component.css'
})
export class UserBudgetComponent implements OnInit{
  public isUserAuthenticated: boolean = false;
  public auth:boolean = false;

  constructor(
    private authService: AuthenticationService,
    @Inject(DOCUMENT) private document: Document,
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
  }
}
