import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../shared/services/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let authServiceStub: jasmine.SpyObj<AuthenticationService>;
    let router: Router;

    beforeEach(async () => {
        authServiceStub = jasmine.createSpyObj('AuthenticationService', ['logout'], {
            authChanged: new BehaviorSubject<boolean>(false)
        });

        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([]),
                MatMenuModule,
                MatButtonModule,
                MatIconModule,
                NavbarComponent // Import the standalone component here
            ],
            providers: [
                { provide: AuthenticationService, useValue: authServiceStub }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        spyOn(router, 'navigate');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should logout user and navigate to homepage', () => {
        component.logout();
        expect(authServiceStub.logout).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should set isUserAuthenticated to true when authentication status changes', () => {
        expect(component.isUserAuthenticated).toBeFalse();
        (authServiceStub.authChanged as BehaviorSubject<boolean>).next(true);
        expect(component.isUserAuthenticated).toBeTrue();
    });

    it('should display appropriate links when user is authenticated', () => {
        (authServiceStub.authChanged as BehaviorSubject<boolean>).next(true);
        fixture.detectChanges();
        const myBudgetLink = fixture.nativeElement.querySelector('a[routerLink="/budget"]');
        expect(myBudgetLink).not.toBeNull();
    });

    it('should hide registration and login links when user is authenticated', () => {
        (authServiceStub.authChanged as BehaviorSubject<boolean>).next(true);
        fixture.detectChanges();
        const loginLink = fixture.nativeElement.querySelector('a[routerLink="/login"]');
        const registerLink = fixture.nativeElement.querySelector('a[routerLink="/register"]');
        expect(loginLink).toBeNull();
        expect(registerLink).toBeNull();
    });

    it('should only show the "My Budget" link when the user is authenticated', () => {
        (authServiceStub.authChanged as BehaviorSubject<boolean>).next(false);
        fixture.detectChanges();
        let myBudgetLink = fixture.nativeElement.querySelector('a[routerLink="/budget"]');
        expect(myBudgetLink).toBeNull();

        (authServiceStub.authChanged as BehaviorSubject<boolean>).next(true);
        fixture.detectChanges();
        myBudgetLink = fixture.nativeElement.querySelector('a[routerLink="/budget"]');
        expect(myBudgetLink).not.toBeNull();
    });
});