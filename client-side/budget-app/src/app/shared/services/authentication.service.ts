import { UserForRegistrationDto } from './../../_interfaces/user/userForRegistrationDto.model'; 
import { RegistrationResponseDto } from './../../_interfaces/response/registrationResponseDto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import { AuthResponseDto } from '../../_interfaces/response/AuthenticationResponseDto.model';
import { UserForAuthenticationDto } from '../../_interfaces/user/userForAuthenticationDto.model';
import { Subject } from 'rxjs';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BudgetToSaveDto } from '../../_interfaces/user/budgetToSaveDto.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, @Inject(DOCUMENT) private document: Document) { }

  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this.http.post<RegistrationResponseDto> (this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }
  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    return this.http.post<AuthResponseDto>(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }
  public saveBudget = (route:string, body: BudgetToSaveDto) => {
    return this.http.post<BudgetToSaveDto> (this.createCompleteRoute(route, this.envUrl.urlAddress), body);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  public logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    this.sendAuthStateChangeNotification(false);
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    if(token){
      return true
    }
    return false;
  }

  public getUserEmail = (): string =>{
    const token = localStorage.getItem("email");
    if(token){
      return token
    }
    return "";
  }
}
