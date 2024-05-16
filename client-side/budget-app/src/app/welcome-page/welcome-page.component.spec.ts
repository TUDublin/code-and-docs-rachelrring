import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WelcomePageComponent } from './welcome-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WelcomePageComponent,
        NoopAnimationsModule,
        RouterLink,
        RouterTestingModule.withRoutes([]),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct router links for navigation', () => {
    const debugElements = fixture.debugElement.queryAll(By.directive(RouterLink));
    const indexVisualisations = debugElements.findIndex(de => de.attributes['routerLink'] === "/visualisations");
    const indexBudgetPlanner = debugElements.findIndex(de => de.attributes['routerLink'] === "/budget-planner");
    const indexBudget = debugElements.findIndex(de => de.attributes['routerLink'] === "/budget");

    expect(indexVisualisations).toBeGreaterThan(-1);
    expect(indexBudgetPlanner).toBeGreaterThan(-1);
    expect(indexBudget).toBeGreaterThan(-1);
  });

});
