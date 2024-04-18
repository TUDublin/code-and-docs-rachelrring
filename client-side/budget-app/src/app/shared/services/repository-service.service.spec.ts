import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RepositoryService } from './repository-service.service';
import { EnvironmentUrlService } from './environment-url.service';
import { Budget } from '../../_interfaces/budget.model';

describe('RepositoryService', () => {
    let service: RepositoryService;
    let httpMock: HttpTestingController;
    let envUrlServiceSpy: jasmine.SpyObj<EnvironmentUrlService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('EnvironmentUrlService', ['get urlAddress']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                RepositoryService,
                { provide: EnvironmentUrlService, useValue: spy }
            ]
        });
        service = TestBed.inject(RepositoryService);
        httpMock = TestBed.inject(HttpTestingController);
        envUrlServiceSpy = TestBed.inject(EnvironmentUrlService) as jasmine.SpyObj<EnvironmentUrlService>;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should retrieve data from the server', () => {
        const mockResponse = { expenses: 1000, income: 2000 };
        const mockRoute = 'api/budget/get';
        const mockUrlAddress = 'http://example.com';
        envUrlServiceSpy.urlAddress = mockUrlAddress;


        const b: Budget = {
            userId: '',
            incomePay: 0,
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
            paymentGym: 0,
            paymentStreamingServices: 0,
            paymentHolidays: 0,
            paymentOther: 0,
            incomeTotal: 0,
            paymentTotal: 0
        };

        service.getData(mockRoute).subscribe(response => expect(response).toEqual(b));

        const req = httpMock.expectOne(`${mockUrlAddress}/${mockRoute}`);
        expect(req.request.method).toBe('GET');
        req.flush(b);
    });
});
