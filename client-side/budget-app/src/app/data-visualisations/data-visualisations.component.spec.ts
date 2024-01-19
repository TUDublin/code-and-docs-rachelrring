import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataVisualisationsComponent } from './data-visualisations.component';

describe('DataVisualisationsComponent', () => {
  let component: DataVisualisationsComponent;
  let fixture: ComponentFixture<DataVisualisationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataVisualisationsComponent, NoopAnimationsModule,]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataVisualisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
