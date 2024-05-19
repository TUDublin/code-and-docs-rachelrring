import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { EnvironmentUrlService } from './environment-url.service';
import { RegistrationResponseDto } from './../../_interfaces/response/registrationResponseDto.model';
import { AuthResponseDto } from '../../_interfaces/response/AuthenticationResponseDto.model';
import { BudgetToSaveDto } from '../../_interfaces/user/budgetToSaveDto.model';
import { UserPasswordResetDto } from '../../_interfaces/user/userPasswordReset.model';
import { UserBudgetResponseDto } from '../../_interfaces/response/UserBudgetResponseDto.model';
import { UserForRegistrationDto } from '../../_interfaces/user/userForRegistrationDto.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService, EnvironmentUrlService]
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to register a user', () => {
    const mockResponse: RegistrationResponseDto = {
        isSuccessfulRegistration: true,
        errros: []
    };
    const mockUser: UserForRegistrationDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'John@email.com',
        password: 'Password1!',
        confirmPassword: 'Password1!'
    };

    service.registerUser('api/accounts/registration', mockUser).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://localhost:7176/api/accounts/registration');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should send a POST request to login a user', () => {
    const mockResponse: AuthResponseDto = {
        accessToken: 'mockAccessToken',
        tokenType: '',
        expiresIn: 0,
        refreshToken: ''
    };
    const mockUser = { email: 'john.doe@example.com', password: 'password' };

    service.loginUser('login', mockUser).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://localhost:7176/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should send a POST request to save budget', () => {
    const b: BudgetToSaveDto = {
        userEmail: 'johnDoe@email.com',
        incomePay: 100,
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
        paymentBroadband: 90,
        paymentTvLicense: 0,
        paymentHomeMaintenance: 0,
        paymentGroceries: 0,
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

    service.saveBudget('api/budget/save', b).subscribe(response => {
      expect(response).toEqual(b);
    });

    const req = httpMock.expectOne('https://localhost:7176/api/budget/save');
    expect(req.request.method).toBe('POST');
    req.flush(b);
  });

  it('should send a POST request to reset password', () => {
    const mockResponse: UserPasswordResetDto = { email: 'test@example.com', password: 'newPassword' };
    const mockResetData = { email: 'test@example.com', password: 'oldPassword' };

    service.resetPassword('api/accounts/passwordreset', mockResetData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://localhost:7176/api/accounts/passwordreset');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should send a GET request to fetch budget', () => {
    const mockResponse: UserBudgetResponseDto = {
        incomePay: 10000,
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
        paymentGroceries: 0,
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
        paymentGym: 9,
        paymentStreamingServices: 0,
        paymentHolidays: 0,
        paymentOther: 0,
        incomeTotal: 90,
        paymentTotal: 0
    };

    service.getBudget('api/budget/get').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://localhost:7176/api/budget/get');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});

describe('Additional AuthenticationService Tests', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        EnvironmentUrlService,
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle login error', () => {
    const errorMessage = 'Invalid credentials';
    service.loginUser('login', { email: 'wrong@example.com', password: 'wrong' }).subscribe(
      () => fail('should have failed with the 401 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(401);
      }
    );
    const req = httpMock.expectOne('https://localhost:7176/login');
    req.flush({ message: errorMessage }, { status: 401, statusText: 'Unauthorized' });
  });

  it('should handle registration error', () => {
    const mockUser: UserForRegistrationDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'John@fail.com',
      password: 'Password1!',
      confirmPassword: 'Password1!'
    };
    service.registerUser('api/accounts/registration', mockUser).subscribe(
      () => fail('should have failed with the 400 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(400);
      }
    );
    const req = httpMock.expectOne('https://localhost:7176/api/accounts/registration');
    req.flush({ message: 'Registration failed' }, { status: 400, statusText: 'Bad Request' });
  });

  it('should return false for isUserAuthenticated if no token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.isUserAuthenticated()).toBeFalse();
  });
});

