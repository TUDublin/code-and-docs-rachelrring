import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseGraphComponent } from './expense-graph.component';

describe('ExpenseGraphComponent', () => {
  let component: ExpenseGraphComponent;
  let fixture: ComponentFixture<ExpenseGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total category expenses correctly', () => {
    component.categoryData = [
      { key: 'Food', value: 150 },
      { key: 'Utilities', value: 100 }
    ];
    component.expenseTotal = 1000;

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.categoryTotal).toEqual(250);
    expect(component.percentageOfTotalExpenses).toEqual(25);
  });

  it('should handle no data correctly', () => {
    component.categoryData = [];
    component.expenseTotal = 1000;
    
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.categoryTotal).toEqual(0);
    expect(component.percentageOfTotalExpenses).toEqual(0);
  });

  it('should calculate zero percent correctly if expenseTotal is zero', () => {
    component.categoryData = [{ key: 'Entertainment', value: 500 }];
    component.expenseTotal = 0;
    
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.percentageOfTotalExpenses).toEqual(0);
  });

});
