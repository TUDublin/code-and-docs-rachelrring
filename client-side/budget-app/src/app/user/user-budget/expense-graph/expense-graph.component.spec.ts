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
});
