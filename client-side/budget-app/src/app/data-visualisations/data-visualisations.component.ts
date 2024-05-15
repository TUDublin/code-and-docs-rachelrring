import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HS0672015Region, HS2082015 } from './CSOData/CSOData';
import { Chart } from 'chart.js/auto';
import { UserBudgetResponseDto } from '../_interfaces/response/UserBudgetResponseDto.model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { RouterLink, Router } from '@angular/router';

const barColors = [
  'rgba(54, 162, 235, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(23, 162, 184, 1)',
  'rgba(136, 84, 208, 1)',
  'rgba(149, 165, 166, 1)',
  'rgba(189, 195, 199, 1)',
  'rgba(41, 128, 185, 1)',
  'rgba(236, 112, 99, 1)'
];

@Component({
  selector: 'app-data-visualisations',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './data-visualisations.component.html',
  styleUrl: './data-visualisations.component.css'
})
export class DataVisualisationsComponent implements OnInit {
  public datahs067!: HS0672015Region;
  public datahs208!: HS2082015;
  public datahs208OverView!: HS2082015;
  public datahs208Recommendations!: HS2082015;
  public expenseTotal = 0;
  public householdNumber = "All household sizes";

  public isUserAuthenticated: boolean = false;
  public auth: boolean = false;
  public hasBudget: boolean = false;
  public budget!: UserBudgetResponseDto;

  chart: any;
  wagesChart: any;
  disposableIncomeChart: any;
  deductionsChart: any;
  hs208Chart: any;
  hs208ChartOverView: any;

  // user data for recommendations
  public totalExpWeeklyUser = 0;
  public mortageExpWeeklyUser = 0;
  public rentExpWeeklyUser = 0;
  public councilTaxExpWeeklyUser = 0;
  public gasExpWeeklyUser = 0;
  public electricityExpWeeklyUser = 0;
  public waterExpWeeklyUser = 0;
  public phoneExpWeeklyUser = 0;
  public broadbandExpWeeklyUser = 0;
  public groceriesExpWeeklyUser = 0;
  public takeawayExpWeeklyUser = 0;
  public diningOutExpWeeklyUser = 0;
  public cigarettesExpWeeklyUser = 0;
  public clothesExpWeeklyUser = 0;
  public childcareExpWeeklyUser = 0;
  public carTaxExpWeeklyUser = 0;
  public carFuelExpWeeklyUser = 0;
  public publicTransportExpWeeklyUser = 0;
  // CSO data for recomendations
  public totalExpWeeklyCSO = 0;
  public mortageExpWeeklyCSO = 0;
  public rentExpeWeeklyCSO = 0;
  public councilTaxExpWeeklyCSO = 0;
  public gasExpWeeklyCSO = 0;
  public electricityExpWeeklyCSO = 0;
  public waterExpWeeklyCSO = 0;
  public phoneExpWeeklyCSO = 0;
  public broadbandExpWeeklyCSO = 0;
  public groceriesExpWeeklyCSO = 0;
  public takeawayExpWeeklyCSO = 0;
  public diningOutExpWeeklyCSO = 0;
  public cigarettesExpWeeklCSO = 0;
  public clothesExpWeeklyCSO = 0;
  public childcareExpWeeklyCSO = 0;
  public carTaxExpWeeklyCSO = 0;
  public carFuelExpWeeklyCSO = 0;
  public publicTransportExpWeeklyCSO = 0;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {
    const localStorage = document.defaultView?.localStorage;
    if (localStorage) {
      this.auth = true;
    }
  }

  ngOnInit(): void {
    this.http.get<HS0672015Region>(environment.goUrlAddress + '/hs067Region').subscribe(
      {
        next: (res: HS0672015Region) => {
          this.datahs067 = res;
          this.createChartHS067(this.datahs067);
          this.createGrossIncomeChart(this.datahs067);
          this.createDisposableIncomeChart(this.datahs067);
          this.createDeductionsChart(this.datahs067);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );

    this.http.get<HS2082015>(environment.goUrlAddress + '/hs208').subscribe(
      {
        next: (res: HS2082015) => {
          this.datahs208 = res;
          this.createChartHS208(this.datahs208, "All household sizes");
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );

    this.http.get<HS2082015>(environment.goUrlAddress + '/hs208OverView').subscribe(
      {
        next: (res: HS2082015) => {
          this.datahs208OverView = res;
          this.createChartHS208OverView(this.datahs208OverView, "All household sizes");
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );

    this.http.get<HS2082015>(environment.goUrlAddress + '/hs208Recommendations').subscribe(
      {
        next: (res: HS2082015) => {
          this.datahs208Recommendations = res;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );

    if (this.auth) {
      this.isUserAuthenticated = this.authService.isUserAuthenticated();
    }
    if (this.isUserAuthenticated) {
      let ue = localStorage.getItem('email')?.toString()
      if (ue) {
        let address = 'api/accounts/budget/' + ue
        this.authService.getBudget(address).subscribe({
          next: (res: UserBudgetResponseDto) => {
            this.hasBudget = true;
            this.budget = res;
            this.getUserRecommendationValues();
            this.updateHouseholdSize('All household sizes');
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        });
      }
    }
  }

  createChartHS208(data: HS2082015, householdSize: string): void {
    if (this.hs208Chart) {
      this.hs208Chart.destroy();
    }

    const filteredData = data.Rows.filter(row => row.HouseholdSize === householdSize && row.ExpenditureType !== "00.00.00.00 Total average weekly household expenditure");

    const expenditureTypes = filteredData.map(row => row.ExpenditureType);
    const dataValues = filteredData.map(row => row.Value);

    const totalEntry = data.Rows.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "00.00.00.00 Total average weekly household expenditure");
    this.expenseTotal = totalEntry ? totalEntry.Value : 0;

    const ctx = document.getElementById('hs208Chart') as HTMLCanvasElement;
    this.hs208Chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: expenditureTypes,
        datasets: [{
          data: dataValues,
          backgroundColor: barColors,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: false,
            },
            ticks: {
              display: false
            },
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount (€)'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Total Weekly Expenditure - Fine Grained'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += '€' + context.parsed.y.toFixed(2);
                }
                return label;
              }
            }
          },
        }
      }
    });
  }

  createChartHS208OverView(data: HS2082015, householdSize: string): void {
    if (this.hs208ChartOverView) {
      this.hs208ChartOverView.destroy();
    }

    const filteredData = data.Rows.filter(row => row.HouseholdSize === householdSize && row.ExpenditureType !== "00.00.00.00 Total average weekly household expenditure");

    const expenditureTypes = filteredData.map(row => row.ExpenditureType);
    const dataValues = filteredData.map(row => row.Value);

    const ctx = document.getElementById('hs208ChartOverView') as HTMLCanvasElement;
    this.hs208ChartOverView = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: expenditureTypes,
        datasets: [{
          data: dataValues,
          backgroundColor: barColors,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: false,
            },
            ticks: {
              display: false
            },
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount (€)'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Total Weekly Expenditure'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += '€' + context.parsed.y.toFixed(2);
                }
                return label;
              }
            }
          },
        }
      }
    });
  }

  updateOverViewChart(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const householdSize = selectElement.value;
    this.householdNumber = householdSize;
    if (this.datahs208OverView) {
      this.createChartHS208OverView(this.datahs208OverView, householdSize);
    } else {
      console.error("Data not loaded when changing selection");
    }
    if (this.datahs208) {
      this.createChartHS208(this.datahs208, householdSize);
    } else {
      console.error("Data not loaded when changing selection");
    }
  }

  createChartHS067(data: HS0672015Region) {
    const incomeTypes = [
      "Self-employed income",
      "Retirement pensions",
      "Investment income",
      "Property income",
      "Child benefit",
      "Other direct income",
    ];

    const datasets = Object.keys(data).map(regionKey => {
      const regionData = data[regionKey as keyof HS0672015Region];
      const dataValues = incomeTypes.map(incomeType => {
        const incomeData = regionData.find(row => row.IncomeType === incomeType);
        return incomeData ? incomeData.Value : 0;
      });

      return {
        label: regionKey,
        data: dataValues,
      };
    });

    this.chart = new Chart('barChartHS067', {
      type: 'bar',
      data: {
        labels: incomeTypes,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount (€)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Average Weekly Household Income by Region and Income Type',
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += '€' + context.parsed.y.toFixed(2);
                }
                return label;
              }
            }
          },
        },
      },
    });
  }

  createGrossIncomeChart(data: HS0672015Region) {
    const incomeType = "Gross income (A+B)";
    const datasets = Object.keys(data).map(regionKey => {
      const regionData = data[regionKey as keyof HS0672015Region];
      const incomeData = regionData.find(row => row.IncomeType === incomeType);
      const value = incomeData ? incomeData.Value : 0;
      return {
        label: regionKey,
        data: [value],
      };
    });

    if (this.wagesChart) {
      this.wagesChart.destroy();
    }

    this.wagesChart = new Chart('wagesChart', {
      type: 'bar',
      data: {
        labels: [''],
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: "Average Weekly Gross Income by Region",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += '€' + context.parsed.y.toFixed(2);
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount (€)'
            }
          }
        },
      }
    });
  }

  createDisposableIncomeChart(data: HS0672015Region) {
    const incomeType = "Disposable income (A+B-C)";

    const datasets = Object.keys(data).map(regionKey => {
      const regionData = data[regionKey as keyof HS0672015Region];
      const incomeData = regionData.find(row => row.IncomeType === incomeType);
      const value = incomeData ? incomeData.Value : 0;

      return {
        label: regionKey,
        data: [value],
      };
    });

    this.disposableIncomeChart = new Chart('disposableIncomeChart', {
      type: 'bar',
      data: {
        labels: [''],
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: "Average Weekly Disposable Income by Region",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += '€' + context.parsed.y.toFixed(2);
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount (€)'
            }
          }
        },
      }
    });
  }

  createDeductionsChart(data: HS0672015Region) {
    const incomeType = "Income tax & social insurance deductions (C)";

    const datasets = Object.keys(data).map(regionKey => {
      const regionData = data[regionKey as keyof HS0672015Region];
      const incomeData = regionData.find(row => row.IncomeType === incomeType);
      const value = incomeData ? incomeData.Value : 0;

      return {
        label: regionKey,
        data: [value],
      };
    });

    this.deductionsChart = new Chart('deductionsChart', {
      type: 'bar',
      data: {
        labels: [''],
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: "Average Weekly Income tax & social insurance deductions by Region",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += '€' + context.parsed.y.toFixed(2);
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount (€)'
            }
          }
        },
      }
    });
  }

  updateRecommendations(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const householdSize = selectElement.value;
    if (this.datahs208Recommendations) {
      this.updateHouseholdSize(householdSize)
    }

  }

  updateHouseholdSize(householdSize: string) {
    const d = this.datahs208Recommendations.Rows;
    let t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "00.00.00.00 Total average weekly household expenditure");
    this.totalExpWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "05.04 Mortgage payment (primary dwelling)");
    this.mortageExpWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "05.01 Rent paid for primary dwelling");
    this.rentExpeWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "05.09 Local property tax");
    this.councilTaxExpWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "04.02 Gas");
    this.gasExpWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "04.01 Electricity");
    this.electricityExpWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "05.10 Water charges");
    this.waterExpWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "09.02 Telephone, mobile and car phone");
    this.phoneExpWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "09.03.01 Internet subscription fees (not bundled)");
    this.broadbandExpWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "01.01 Total food consumed at home");
    this.groceriesExpWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "01.01.16 Takeaway food brought/delivered to home");
    this.takeawayExpWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "01.02 Meals away from home  (incl. takeout tea/coffee)");
    this.diningOutExpWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "02.03 Tobacco");
    this.cigarettesExpWeeklCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "03 Total clothing and footwear");
    this.clothesExpWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "09.17.03 Childcare");
    this.childcareExpWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "08.03.03 Vehicle Tax");
    this.carTaxExpWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "08.02 Motor Fuel");
    this.carFuelExpWeeklyCSO = t ? t.Value : 0;
    t = undefined;
    t = d.find(row => row.HouseholdSize === householdSize && row.ExpenditureType === "08.05 Bus, Luas, rail and taxi");
    this.publicTransportExpWeeklyCSO = t ? t.Value : 0;
  }

  getUserRecommendationValues() {
    this.totalExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentTotal') {
        return value / 52;
      }
      return total;
    }, 0);
    this.mortageExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentMortgage') {
        return value / 52;
      }
      return total;
    }, 0);
    this.councilTaxExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentHouseTax') {
        return value / 52;
      }
      return total;
    }, 0);
    this.gasExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentHouseGas') {
        return value / 52;
      }
      return total;
    }, 0);
    this.electricityExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentElectricity') {
        return value / 52;
      }
      return total;
    }, 0);
    this.waterExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentWater') {
        return value / 52;
      }
      return total;
    }, 0);
    this.phoneExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentMobilePhone') {
        return value / 52;
      }
      return total;
    }, 0);
    this.broadbandExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentBroadband') {
        return value / 52;
      }
      return total;
    }, 0);
    this.groceriesExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentMortgage') {
        return value / 52;
      }
      return total;
    }, 0);
    this.takeawayExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentGroceries') {
        return value / 52;
      }
      return total;
    }, 0);
    this.diningOutExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentEatingOut') {
        return value / 52;
      }
      return total;
    }, 0);
    this.cigarettesExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentCigarettes') {
        return value / 52;
      }
      return total;
    }, 0);
    this.clothesExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentClothing') {
        return value / 52;
      }
      return total;
    }, 0);
    this.childcareExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentChildcare') {
        return value / 52;
      }
      return total;
    }, 0);
    this.carTaxExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentCarTax') {
        return value / 52;
      }
      return total;
    }, 0);
    this.carFuelExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentCarFuel') {
        return value / 52;
      }
      return total;
    }, 0);
    this.publicTransportExpWeeklyUser = Object.entries(this.budget).reduce((total, [key, value]) => {
      if (key === 'paymentPublicTransport') {
        return value / 52;
      }
      return total;
    }, 0);
  }
}
