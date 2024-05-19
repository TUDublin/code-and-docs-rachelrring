import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserBudgetComponent } from './user-budget.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { of } from 'rxjs';

describe('UserBudgetComponent', () => {
    let component: UserBudgetComponent;
    let fixture: ComponentFixture<UserBudgetComponent>;
    let authService: AuthenticationService;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [
                UserBudgetComponent,
                NoopAnimationsModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                {
                    provide: AuthenticationService,
                    useValue: {
                        isUserAuthenticated: jasmine.createSpy().and.returnValue(of(true)),
                        getBudget: jasmine.createSpy().and.returnValue(of({}))
                    }
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { data: {} }
                    }
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserBudgetComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthenticationService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
        expect(component.hasBudget).toBeFalse();
        expect(component.expensesBudgetArray.length).toEqual(0);
        expect(component.incomeBudgetArray.length).toEqual(0);
    });

    it('should check authentication status on init', () => {
        component.ngOnInit();
        expect(authService.isUserAuthenticated).toHaveBeenCalled();
    });
});