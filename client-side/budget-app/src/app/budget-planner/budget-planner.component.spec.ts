import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BudgetPlannerComponent } from './budget-planner.component';

describe('BudgetPlannerComponent', () => {
  let component: BudgetPlannerComponent;
  let fixture: ComponentFixture<BudgetPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetPlannerComponent, NoopAnimationsModule,]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getChartData', () => {
    it('should return 10 values in the list', () => {
      let input: number [] = [];
      for (let i = 0; i < 51; i++){
        input.push(10);
      }
      let exepctedOutcome = 10;
      let actualOutcome = component.getChartData(input);
      expect(actualOutcome.length).toEqual(exepctedOutcome);
    });
    it('should return the correct values in the list', () => {
      let input: number [] = [];
      for (let i = 0; i < 51; i++){
        input.push(10);
      }
      let exepctedOutcome: number[] = [40, 30, 90, 100, 40, 20, 50, 60, 70, 10];
      let actualOutcome = component.getChartData(input);
      expect(actualOutcome).toEqual(exepctedOutcome);
    });
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
      component.myForm.get('incomePay')?.setValue(-2);
      fixture.detectChanges();
      const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
      expect(submitButton.disabled).toBeTrue();
    });
  });

  describe('getYearlyValues', () => {
    it('returns the correct value when the payment is weekly', () => {
      component.myForm.get('incomePay')?.setValue(10);
      expect(component.getYearlyValues('incomePay')).toEqual(10*52);
    });
    it('returns the correct value when the payment is monthly', () => {
      component.myForm.get('incomePay')?.setValue(10);
      component.myForm.get('incomePayFrequency')?.setValue('monthly');
      expect(component.getYearlyValues('incomePay')).toEqual(10*12);
    });
    it('returns the correct value when the payment is yearly', () => {
      component.myForm.get('incomePay')?.setValue(10);
      component.myForm.get('incomePayFrequency')?.setValue('yearly');
      expect(component.getYearlyValues('incomePay')).toEqual(10);
    });
  });

  describe('Yearly Income', () => {
    it('is calculated correctly', () => {
      component.myForm.get('incomePay')?.setValue(10);
      component.myForm.get('incomeBenefits')?.setValue(20);
      fixture.detectChanges();
      let expectedYearlyIncome = (10*52) + (20*52);
      
      const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
      submitButton.click();
      fixture.detectChanges();

      expect(component.totalYearlyIncome).toEqual(expectedYearlyIncome);
      expect(component.totalYearlyExpenses).toEqual(0);
    });
  });

  describe('Yearly Expenses', () => {
    it('is calculated correctly', () => {
      component.myForm.get('paymentRent')?.setValue(100);
      component.myForm.get('paymentTvLicense')?.setValue(20);
      component.myForm.get('paymentMortgage')?.setValue(100);
      component.myForm.get('paymentOther')?.setValue(100);
      fixture.detectChanges();
      let expectedYearlyExpenses = (100*52) + (20*52) + (100*52) + (100*52);
      
      const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
      submitButton.click();
      fixture.detectChanges();

      expect(component.totalYearlyExpenses).toEqual(expectedYearlyExpenses);
      expect(component.totalYearlyIncome).toEqual(0);
    });
  });

  describe('Yearly Surplus', () => {
    it('is calculated correctly', () => {
      component.myForm.get('paymentRent')?.setValue(100);
      component.myForm.get('paymentTvLicense')?.setValue(20);
      component.myForm.get('paymentMortgage')?.setValue(100);
      component.myForm.get('paymentOther')?.setValue(100);
      component.myForm.get('incomePay')?.setValue(10);
      component.myForm.get('incomeBenefits')?.setValue(20);
      fixture.detectChanges();
      let expectedYearlyExpenses = (100*52) + (20*52) + (100*52) + (100*52);
      let expectedYearlyIncome = (10*52) + (20*52);
      let expectedYearlySurplus = expectedYearlyIncome - expectedYearlyExpenses;
      
      const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
      submitButton.click();
      fixture.detectChanges();

      expect(component.totalYearlyExpenses).toEqual(expectedYearlyExpenses);
      expect(component.totalYearlyIncome).toEqual(expectedYearlyIncome);
      expect(component.totalYearlySurplus).toEqual(expectedYearlySurplus);
    });
  });
});
