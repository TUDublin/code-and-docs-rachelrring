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

});
