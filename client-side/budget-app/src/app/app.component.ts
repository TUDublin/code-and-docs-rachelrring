import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthenticationService } from './shared/services/authentication.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  auth:boolean = false;
  title = 'budget-app';

  constructor(private authService: AuthenticationService, @Inject(DOCUMENT) private document: Document){
    const localStorage = document.defaultView?.localStorage;
    if (localStorage){
      this.auth = true;
    }
  }
  
  ngOnInit(): void {
    if(this.auth){
      if(this.authService.isUserAuthenticated()){
        this.authService.sendAuthStateChangeNotification(true);
      }
    }
  }
}
