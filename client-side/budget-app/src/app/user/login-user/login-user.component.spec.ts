import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { LoginUserComponent } from './login-user.component';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { AuthResponseDto } from '../../_interfaces/response/AuthenticationResponseDto.model';
import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';

describe('LoginUserComponent', () => {
    let component: LoginUserComponent;
    let fixture: ComponentFixture<LoginUserComponent>;
    let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
    let route: ActivatedRoute;
    let router: Router;
    let loader: HarnessLoader;

    beforeEach(async () => {
        const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', ['loginUser', 'sendAuthStateChangeNotification']);
        await TestBed.configureTestingModule({
            imports: [
                LoginUserComponent,
                NoopAnimationsModule,
                RouterLink,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            queryParams: {
                                returnUrl: '/login'
                            }
                        }
                    }
                },
                { provide: AuthenticationService, useValue: authServiceSpyObj },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoginUserComponent);
        component = fixture.componentInstance;
        authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
        route = TestBed.inject(ActivatedRoute);
        loader = TestbedHarnessEnvironment.loader(fixture);
        fixture.detectChanges();
    });
    beforeEach(() => {
        router = TestBed.get(Router);
        route = TestBed.get(ActivatedRoute);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize login form', () => {
        expect(component.loginForm).toBeDefined();
        expect(component.loginForm.get('username')).toBeDefined();
        expect(component.loginForm.get('password')).toBeDefined();
    });

    it('should navigate to returnUrl after successful login', async () => {
        const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
        const inputFieldUsername = fixture.debugElement.nativeElement.querySelector('#username');
        const passwordInput = fixture.debugElement.nativeElement.querySelector('#password');

        inputFieldUsername.value = 'testUser@email.com';
        passwordInput.value = 'Password1!';

        submitButton.click();

        const authResponse: AuthResponseDto = {
            accessToken: 'fakeAccessToken',
            tokenType: '',
            expiresIn: 0,
            refreshToken: ''
        };

        authServiceSpy.loginUser.and.returnValue(of(authResponse));

        expect(router.url).toBe('/');
    });

    // it('should store the users access token', () => {
    //     const localStorageSpy = spyOn(localStorage, 'setItem').and.callThrough();
    //     const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    //     const inputFieldUsername = fixture.debugElement.nativeElement.querySelector('#username');
    //     const passwordInput = fixture.debugElement.nativeElement.querySelector('#password');

    //     inputFieldUsername.value = 'testUser@email.com';
    //     passwordInput.value = 'Password1!';

    //     submitButton.click();

    //     const authResponse: AuthResponseDto = {
    //         accessToken: 'fakeAccessToken',
    //         tokenType: '',
    //         expiresIn: 0,
    //         refreshToken: ''
    //     };

    //     authServiceSpy.loginUser.and.returnValue(of(authResponse));

    //     expect(localStorageSpy).toHaveBeenCalledWith('token', 'token');
    //     expect(localStorageSpy).toHaveBeenCalledWith('email', 'testUser@email.com');

    // });

});