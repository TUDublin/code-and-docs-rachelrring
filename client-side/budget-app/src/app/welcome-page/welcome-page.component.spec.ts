import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WelcomePageComponent } from './welcome-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
});
