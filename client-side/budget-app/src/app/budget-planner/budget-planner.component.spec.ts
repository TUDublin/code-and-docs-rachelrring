import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BudgetPlannerComponent } from './budget-planner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('BudgetPlannerComponent', () => {
  let component: BudgetPlannerComponent;
  let fixture: ComponentFixture<BudgetPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BudgetPlannerComponent,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BudgetPlannerComponent);
    component = fixture.componentInstance;
    component.isUserAuthenticated = true;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form fields with default values', () => {
    expect(component.myForm.get('incomePay')?.value).toBe(0.00);
    expect(component.myForm.get('incomePayFrequency')?.value).toBe('weekly');
  });

  it('should calculate yearly values correctly', () => {
    component.myForm.setValue({
      incomePay: 100, incomePayFrequency: 'weekly',
      incomeBenefits: 200, incomeBenefitsFrequency: 'monthly',
      incomePension: 300, incomePensionFrequency: 'weekly',
      incomeOther: 400, incomeOtherFrequency: 'monthly',
      paymentMortgage: 500, paymentMortgageFrequency: 'monthly',
      paymentRent: 600, paymentRentFrequency: 'monthly',
      paymentHomeInsurance: 700, paymentHomeInsuranceFrequency: 'yearly',
      paymentHouseTax: 800, paymentHouseTaxFrequency: 'yearly',
      paymentHouseGas: 900, paymentHouseGasFrequency: 'monthly',
      paymentElectricity: 1000, paymentElectricityFrequency: 'monthly',
      paymentWater: 1100, paymentWaterFrequency: 'quarterly',
      paymentHomePhone: 1200, paymentHomePhoneFrequency: 'monthly',
      paymentMobilePhone: 1300, paymentMobilePhoneFrequency: 'monthly',
      paymentBroadband: 1400, paymentBroadbandFrequency: 'monthly',
      paymentTvLicense: 1500, paymentTvLicenseFrequency: 'yearly',
      paymentHomeMaintenance: 1600, paymentHomeMaintenanceFrequency: 'yearly',
      paymentGroceries: 1700, paymentGroceriesFrequency: 'weekly',
      paymentTakeaways: 1800, paymentTakeawaysFrequency: 'weekly',
      paymentCigarettes: 1900, paymentCigarettesFrequency: 'weekly',
      paymentEatingOut: 2000, paymentEatingOutFrequency: 'monthly',
      paymentClothing: 2100, paymentClothingFrequency: 'monthly',
      paymentChildcare: 2200, paymentChildcareFrequency: 'monthly',
      paymentHealthandBeauty: 2300, paymentHealthandBeautyFrequency: 'monthly',
      paymentEyeCare: 2400, paymentEyeCareFrequency: 'yearly',
      paymentDentalCare: 2500, paymentDentalCareFrequency: 'yearly',
      paymentMedicine: 2600, paymentMedicineFrequency: 'monthly',
      paymentActivities: 2700, paymentActivitiesFrequency: 'monthly',
      paymentPocketMoney: 2800, paymentPocketMoneyFrequency: 'weekly',
      paymentChildSupport: 2900, paymentChildSupportFrequency: 'monthly',
      paymentSchoolFees: 3000, paymentSchoolFeesFrequency: 'monthly',
      paymentPetFood: 3100, paymentPetFoodFrequency: 'monthly',
      paymentVetBills: 3200, paymentVetBillsFrequency: 'yearly',
      paymentLifeInsurance: 3300, paymentLifeInsuranceFrequency: 'yearly',
      paymentHealthInsurance: 3400, paymentHealthInsuranceFrequency: 'yearly',
      paymentDentalInsurance: 3500, paymentDentalInsuranceFrequency: 'yearly',
      paymentPetInsurance: 3600, paymentPetInsuranceFrequency: 'yearly',
      paymentCarInsurance: 3700, paymentCarInsuranceFrequency: 'yearly',
      paymentBankFees: 3800, paymentBankFeesFrequency: 'monthly',
      paymentLoan: 3900, paymentLoanFrequency: 'monthly',
      paymentCreditCard: 4000, paymentCreditCardFrequency: 'monthly',
      paymentHirePurchases: 4100, paymentHirePurchasesFrequency: 'monthly',
      paymentInvestments: 4200, paymentInvestmentsFrequency: 'monthly',
      paymentPension: 4300, paymentPensionFrequency: 'monthly',
      paymentCarFuel: 4400, paymentCarFuelFrequency: 'weekly',
      paymentCarTax: 4500, paymentCarTaxFrequency: 'yearly',
      paymentCarMaintenance: 4600, paymentCarMaintenanceFrequency: 'monthly',
      paymentPublicTransport: 4700, paymentPublicTransportFrequency: 'monthly',
      paymentGym: 4800, paymentGymFrequency: 'monthly',
      paymentStreamingServices: 4900, paymentStreamingServicesFrequency: 'monthly',
      paymentHolidays: 5000, paymentHolidaysFrequency: 'yearly',
      paymentOther: 5100, paymentOtherFrequency: 'monthly',
    });

    const yearlyIncomePay = component.getYearlyValues('incomePay');
    const yearlyIncomeBenefits = component.getYearlyValues('incomeBenefits');
    const yearlyIncomePension = component.getYearlyValues('incomePension');
    const yearlyIncomeOther = component.getYearlyValues('incomeOther');

    expect(yearlyIncomePay).toBe(100 * 52);
    expect(yearlyIncomeBenefits).toBe(200 * 12);
    expect(yearlyIncomePension).toBe(300 * 52);
    expect(yearlyIncomeOther).toBe(400 * 12);
  });

  describe('Income and Expenses Form', () => {
    it('is valid when the form is first loaded', () => {
      expect(component.myForm.valid).toBeTrue();
    });
    it('is invalid when any of the fields are empty', () => {
      component.myForm.get('incomePay')?.setValue('');
      expect(component.myForm.valid).toBeFalse();
    });
    it('is invalid when any of the fields are less than o', () => {
      component.myForm.get('incomePay')?.setValue(-2);
      expect(component.myForm.valid).toBeFalse();
    });
    it('disables the submit button when any of the fields are invalid', () => {
      component.isUserAuthenticated = true;
      fixture.detectChanges();
      component.myForm.get('incomePay')?.setValue(-2);
      fixture.detectChanges();
      const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
      expect(submitButton.disabled).toBeTrue();
    });
    it('should display the budget form only when user is authenticated', () => {
      component.isUserAuthenticated = false;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('.not-logged-in').textContent).toContain('Log in')
    });
  });

  describe('getYearlyValues', () => {
    it('returns the correct value when the payment is weekly', () => {
      component.myForm.get('incomePay')?.setValue(10);
      expect(component.getYearlyValues('incomePay')).toEqual(10 * 52);
    });
    it('returns the correct value when the payment is monthly', () => {
      component.myForm.get('incomePay')?.setValue(10);
      component.myForm.get('incomePayFrequency')?.setValue('monthly');
      expect(component.getYearlyValues('incomePay')).toEqual(10 * 12);
    });
    it('returns the correct value when the payment is yearly', () => {
      component.myForm.get('incomePay')?.setValue(10);
      component.myForm.get('incomePayFrequency')?.setValue('yearly');
      expect(component.getYearlyValues('incomePay')).toEqual(10);
    });
  });

  describe('Yearly Income', () => {
    it('is calculated correctly', () => {
      component.isUserAuthenticated = true;
      fixture.detectChanges();
      component.myForm.get('incomePay')?.setValue(10);
      component.myForm.get('incomeBenefits')?.setValue(20);
      fixture.detectChanges();
      let expectedYearlyIncome = (10 * 52) + (20 * 52);

      const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
      submitButton.click();
      fixture.detectChanges();

      expect(component.totalYearlyIncome).toEqual(expectedYearlyIncome);
      expect(component.totalYearlyExpenses).toEqual(0);
    });
  });

  describe('Yearly Expenses', () => {
    it('is calculated correctly', () => {
      component.isUserAuthenticated = true;
      fixture.detectChanges();
      component.myForm.get('paymentRent')?.setValue(100);
      component.myForm.get('paymentTvLicense')?.setValue(20);
      component.myForm.get('paymentMortgage')?.setValue(100);
      component.myForm.get('paymentOther')?.setValue(100);
      fixture.detectChanges();
      let expectedYearlyExpenses = (100 * 52) + (20 * 52) + (100 * 52) + (100 * 52);

      const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
      submitButton.click();
      fixture.detectChanges();

      expect(component.totalYearlyExpenses).toEqual(expectedYearlyExpenses);
      expect(component.totalYearlyIncome).toEqual(0);
    });
  });

  describe('Yearly Surplus', () => {
    it('is calculated correctly', () => {
      component.isUserAuthenticated = true;
      fixture.detectChanges();
      component.myForm.get('paymentRent')?.setValue(100);
      component.myForm.get('paymentTvLicense')?.setValue(20);
      component.myForm.get('paymentMortgage')?.setValue(100);
      component.myForm.get('paymentOther')?.setValue(100);
      component.myForm.get('incomePay')?.setValue(10);
      component.myForm.get('incomeBenefits')?.setValue(20);
      fixture.detectChanges();
      let expectedYearlyExpenses = (100 * 52) + (20 * 52) + (100 * 52) + (100 * 52);
      let expectedYearlyIncome = (10 * 52) + (20 * 52);
      let expectedYearlySurplus = expectedYearlyIncome - expectedYearlyExpenses;

      const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
      submitButton.click();
      fixture.detectChanges();

      expect(component.totalYearlyExpenses).toEqual(expectedYearlyExpenses);
      expect(component.totalYearlyIncome).toEqual(expectedYearlyIncome);
      expect(component.totalYearlySurplus).toEqual(expectedYearlySurplus);
    });
    it('is calculated correctly when expenses exceed income', () => {
      component.isUserAuthenticated = true;
      fixture.detectChanges();
      component.myForm.get('paymentRent')?.setValue(100);
      component.myForm.get('paymentTvLicense')?.setValue(20);
      component.myForm.get('paymentMortgage')?.setValue(100);
      component.myForm.get('paymentOther')?.setValue(100);
      component.myForm.get('incomePay')?.setValue(10);
      component.myForm.get('incomeBenefits')?.setValue(20);
      fixture.detectChanges();

      let expectedYearlyExpenses = (100 * 52) + (20 * 52) + (100 * 52) + (100 * 52);
      let expectedYearlyIncome = (10 * 52) + (20 * 52);
      let expectedYearlySurplus = expectedYearlyIncome - expectedYearlyExpenses;

      const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
      submitButton.click();
      fixture.detectChanges();

      expect(component.totalYearlyExpenses).toEqual(expectedYearlyExpenses);
      expect(component.totalYearlyIncome).toEqual(expectedYearlyIncome);
      expect(component.totalYearlySurplus).toEqual(expectedYearlySurplus); // Adjusted expectation
    });
  });

  describe('Income and Expenses Charts', () => {
    it('should show charts onSubmit()', () => {
      component.isUserAuthenticated = true;
      fixture.detectChanges();
      spyOn(component, 'updateDoughnutChart');
      spyOn(component, 'updateIncomeDoughnutChart');
      const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
      submitButton.click();
      fixture.detectChanges();
      expect(component.updateDoughnutChart).toHaveBeenCalled();
      expect(component.updateIncomeDoughnutChart).toHaveBeenCalled();
    });
    it('should initialize chart and incomeChart as undefined initially', () => {
      expect(component.chart).toBeUndefined();
      expect(component.incomeChart).toBeUndefined();
    });
  });
});
