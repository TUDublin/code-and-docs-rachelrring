import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecommendationListComponent } from './recommendation-list.component';

describe('RecommendationListComponent', () => {
  let component: RecommendationListComponent;
  let fixture: ComponentFixture<RecommendationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendationListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RecommendationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display correct links for a given expense name', () => {
    const expectedLinks = [
      {
        "title": "Ireland's cheapest student towns",
        "link": "https://switcher.ie/loans/guides/student-cost-of-living-ireland/"
      },
      {
        "title": "Rent Tax Credit",
        "link": "https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/land-and-property/rent-credit/index.aspx"
      },
      {
        "title": "These are the most expensive and cheapest areas for renting in Ireland",
        "link": "https://www.thejournal.ie/rent-prices-ireland-2-3315636-Apr2017/"
      },
    ]
    component.expenseName = 'Weekly Rent Payment';
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.links).toEqual(expectedLinks);
  });

  it('should display no links if expense name does not match any entries', () => {
    component.expenseName = 'Non-existent Expense';
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.links.length).toBe(0);
  });

  it('should handle null expense name', () => {
    component.expenseName = '';
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.links.length).toBe(0);
  });

  it('links array should be empty before ngOnInit is called', () => {
    expect(component.links).toEqual([]);
  });

  it('should handle unexpected expense name gracefully', () => {
    component.expenseName = 'Unexpected Expense';
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.links.length).toBe(0);
  });
});
