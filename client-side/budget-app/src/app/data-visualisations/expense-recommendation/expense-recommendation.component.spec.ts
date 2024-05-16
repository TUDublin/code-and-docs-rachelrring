import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseRecommendationComponent } from './expense-recommendation.component';

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
});
