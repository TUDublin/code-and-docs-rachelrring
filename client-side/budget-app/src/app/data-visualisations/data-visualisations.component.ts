import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HS0672015Region, HS2082015 } from './CSOData/CSOData';
import { Chart } from 'chart.js/auto';

const barColors = [
  'rgba(54, 162, 235, 1)',   // Light Blue (State)
  'rgba(255, 99, 132, 1)',   // Pink (Border)
  'rgba(255, 159, 64, 1)',   // Orange (Midland)
  'rgba(23, 162, 184, 1)',   // Teal (West)
  'rgba(136, 84, 208, 1)',   // Purple (Dublin)
  'rgba(149, 165, 166, 1)',  // Gray (MidEast)
  'rgba(189, 195, 199, 1)',  // Light Gray (MidWest)
  'rgba(41, 128, 185, 1)',   // Soft Blue (SouthEast)
  'rgba(236, 112, 99, 1)'    // Soft Pink (SouthWest)
];

@Component({
  selector: 'app-data-visualisations',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './data-visualisations.component.html',
  styleUrl: './data-visualisations.component.css'
})
export class DataVisualisationsComponent implements OnInit {
  public datahs067!: HS0672015Region;
  public datahs208!: HS2082015;
  public datahs208OverView!: HS2082015;
  public expenseTotal = 0;
  public householdNumber = "All household sizes";

  chart: any;
  wagesChart: any;
  disposableIncomeChart: any;
  deductionsChart: any;
  hs208Chart: any;
  hs208ChartOverView: any;


  constructor(private http: HttpClient) { }

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
}
