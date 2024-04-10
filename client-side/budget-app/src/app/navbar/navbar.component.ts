import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from './../shared/services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, MatToolbarModule, MatIconModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  public isUserAuthenticated: boolean = false;
  public auth:boolean = false;

  constructor(private authService: AuthenticationService, private router: Router,  @Inject(DOCUMENT) private document: Document) {
    this.authService.authChanged.subscribe(res => {
      this.isUserAuthenticated = res;
    })
    const localStorage = document.defaultView?.localStorage;
    if (localStorage){
      this.auth = true;
    }
  }

  ngOnInit(): void {
    if(this.auth){
      this.authService.authChanged.subscribe(res => {
        this.isUserAuthenticated = res;
    });
    }
  }

  public logout = () => {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
