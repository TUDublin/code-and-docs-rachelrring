import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let authServiceStub: Partial<AuthenticationService>;
    let router: Router;
    let route: ActivatedRoute;

    beforeEach(async () => {
        authServiceStub = {
            authChanged: new BehaviorSubject<boolean>(false),
            logout: jasmine.createSpy('logout')
        };
        await TestBed.configureTestingModule({
            imports: [
                NavbarComponent,
                NoopAnimationsModule,
                RouterLink,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                { provide: ActivatedRoute, useValue: of() },
                { provide: AuthenticationService, useValue: authServiceStub },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    beforeEach(() => {
        router = TestBed.get(Router);
        route = TestBed.get(ActivatedRoute);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should logout user', () => {
        component.logout();
        expect(authServiceStub.logout).toHaveBeenCalled();
        fixture.detectChanges();
        expect(router.url).toBe('/');
    });

    it('should set isUserAuthenticated to true when authentication status changes', () => {
        expect(component.isUserAuthenticated).toBeFalse();
        (authServiceStub.authChanged as BehaviorSubject<boolean>).next(true);
        expect(component.isUserAuthenticated).toBeTrue();
    });
});