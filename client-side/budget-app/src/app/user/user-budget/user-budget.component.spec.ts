import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserBudgetComponent } from './user-budget.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { UserBudgetResponseDto } from '../../_interfaces/response/UserBudgetResponseDto.model';
import { of } from 'rxjs';

describe('UserBudgetComponent', () => {
    let component: UserBudgetComponent;
    let fixture: ComponentFixture<UserBudgetComponent>;
    let authService: AuthenticationService;
    let router: Router;
    let route: ActivatedRoute;
    let authServiceSpy: jasmine.SpyObj<AuthenticationService>;

    beforeEach(async () => {
        const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', ['isUserAuthenticated', 'getBudget']);

        await TestBed.configureTestingModule({
            imports: [
                UserBudgetComponent,
                NoopAnimationsModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: AuthenticationService, useValue: authServiceSpyObj },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserBudgetComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthenticationService);
        authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
        fixture.detectChanges();
    });
    beforeEach(() => {
        router = TestBed.get(Router);
        route = TestBed.get(ActivatedRoute);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the data in a table', () => {
        let b: UserBudgetResponseDto = {
            incomePay: 10,
            incomeBenefits: 0,
            incomePension: 0,
            incomeOther: 0,
            paymentMortgage: 0,
            paymentRent: 0,
            paymentHomeInsurance: 0,
            paymentHouseTax: 0,
            paymentHouseGas: 0,
            paymentElectricity: 0,
            paymentWater: 0,
            paymentHomePhone: 0,
            paymentMobilePhone: 0,
            paymentBroadband: 0,
            paymentTvLicense: 0,
            paymentHomeMaintenance: 0,
            paymentGroceries: 90,
            paymentTakeaways: 0,
            paymentCigarettes: 0,
            paymentEatingOut: 0,
            paymentClothing: 0,
            paymentChildcare: 0,
            paymentHealthandBeauty: 0,
            paymentEyeCare: 0,
            paymentDentalCare: 0,
            paymentMedicine: 0,
            paymentActivities: 0,
            paymentPocketMoney: 0,
            paymentChildSupport: 0,
            paymentSchoolFees: 0,
            paymentPetFood: 0,
            paymentVetBills: 0,
            paymentLifeInsurance: 0,
            paymentHealthInsurance: 0,
            paymentDentalInsurance: 0,
            paymentPetInsurance: 0,
            paymentCarInsurance: 0,
            paymentBankFees: 0,
            paymentLoan: 0,
            paymentCreditCard: 0,
            paymentHirePurchases: 0,
            paymentInvestments: 0,
            paymentPension: 0,
            paymentCarFuel: 0,
            paymentCarTax: 0,
            paymentCarMaintenance: 0,
            paymentPublicTransport: 0,
            paymentGym: 0,
            paymentStreamingServices: 0,
            paymentHolidays: 0,
            paymentOther: 0,
            incomeTotal: 0,
            paymentTotal: 0
        };
        authServiceSpy.isUserAuthenticated.and.returnValue(true);
        authServiceSpy.getBudget.and.returnValue(of(b));
    
        component.ngOnInit();
    
        // // Simulate sorting by value in ascending order
        // component.sortExpensesData({ active: 'value', direction: 'asc' });
        // component.sortIncomeData({ active: 'value', direction: 'asc' });
    
        // fixture.detectChanges();
    });
});