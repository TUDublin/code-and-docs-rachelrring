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
});
