import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseRecommendationComponent, Status } from './expense-recommendation.component';
import { SimpleChange } from '@angular/core';

describe('ExpenseRecommendationComponent', () => {
  let component: ExpenseRecommendationComponent;
  let fixture: ComponentFixture<ExpenseRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseRecommendationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initializSimpleChange: unknown, changes: SimpleChangeschanges: SimpleChanges', () => {
    expect(component.over).toEqual(Status.OnTarget);
  });

  it('should change status to Over when userExpense is greater than csoExpense', () => {
    component.userExpense = 1000;
    component.csoExpense = 500;
    component.ngOnChanges({
      userExpense: new SimpleChange(null, component.userExpense, false),
      csoExpense: new SimpleChange(null, component.csoExpense, false)
    });
    fixture.detectChanges();
    expect(component.over).toEqual(Status.Over);
  });

  it('should change status to Under when userExpense is less than csoExpense', () => {
    component.userExpense = 200;
    component.csoExpense = 500;
    component.ngOnChanges({
      userExpense: new SimpleChange(null, component.userExpense, false),
      csoExpense: new SimpleChange(null, component.csoExpense, false)
    });
    fixture.detectChanges();
    expect(component.over).toEqual(Status.Under);
  });

  it('should keep status OnTarget when userExpense equals csoExpense', () => {
    component.userExpense = 500;
    component.csoExpense = 500;
    component.ngOnChanges({
      userExpense: new SimpleChange(null, component.userExpense, false),
      csoExpense: new SimpleChange(null, component.csoExpense, false)
    });
    fixture.detectChanges();
    expect(component.over).toEqual(Status.OnTarget);
  });

  it('should calculate the correct difference', () => {
    component.userExpense = 100;
    component.csoExpense = 300;
    component.ngOnChanges({
      userExpense: new SimpleChange(null, component.userExpense, true),
      csoExpense: new SimpleChange(null, component.csoExpense, true)
    });
    fixture.detectChanges();
    expect(component.difference).toEqual(200);

    component.userExpense = 400;
    component.csoExpense = 300;
    component.ngOnChanges({
      userExpense: new SimpleChange(null, component.userExpense, false),
      csoExpense: new SimpleChange(null, component.csoExpense, false)
    });
    fixture.detectChanges();
    expect(component.difference).toEqual(100);
  });

  it('should handle zero expenses as OnTarget', () => {
    component.userExpense = 0;
    component.csoExpense = 0;
    component.ngOnChanges({
      userExpense: new SimpleChange(null, component.userExpense, true),
      csoExpense: new SimpleChange(null, component.csoExpense, true)
    });
    fixture.detectChanges();
    expect(component.over).toEqual(Status.OnTarget);
  });

  it('should update to OnTarget when expenses are reset to zero after having a value', () => {
    component.userExpense = 100;
    component.csoExpense = 100;
    component.ngOnChanges({
      userExpense: new SimpleChange(null, component.userExpense, false),
      csoExpense: new SimpleChange(null, component.csoExpense, false)
    });
    fixture.detectChanges();
    
    component.userExpense = 0;
    component.csoExpense = 0;
    component.ngOnChanges({
      userExpense: new SimpleChange(100, component.userExpense, false),
      csoExpense: new SimpleChange(100, component.csoExpense, false)
    });
    fixture.detectChanges();
    expect(component.over).toEqual(Status.OnTarget);
  });
});
