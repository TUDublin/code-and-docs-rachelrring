import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataVisualisationsComponent } from './data-visualisations.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DataVisualisationsComponent', () => {
  let component: DataVisualisationsComponent;
  let fixture: ComponentFixture<DataVisualisationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DataVisualisationsComponent,
        NoopAnimationsModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataVisualisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display logged in view when user is authenticated', () => {
    component.isUserAuthenticated = true;
    component.hasBudget = true;
    fixture.detectChanges();
    expect(component.isUserAuthenticated).toBeTrue();
    const recommendationElement = fixture.nativeElement.querySelector('.logged-in-with-budget');
    expect(recommendationElement).toBeTruthy();
  });

  it('should display logged in view when user is authenticated but no saved budget', () => {
    component.isUserAuthenticated = true;
    component.hasBudget = false;
    fixture.detectChanges();
    expect(component.isUserAuthenticated).toBeTrue();
    const recommendationElement = fixture.nativeElement.querySelector('.logged-in-no-budget');
    expect(recommendationElement).toBeTruthy();
  });

  it('should display not logged in view when user is not authenticated', () => {
    component.isUserAuthenticated = false;
    component.hasBudget = false;
    fixture.detectChanges();
    expect(component.isUserAuthenticated).toBeFalse();
    const recommendationElement = fixture.nativeElement.querySelector('.not-logged-in');
    expect(recommendationElement).toBeTruthy();
  });
});
