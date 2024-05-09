import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HS0672015Region, HS2082015 } from './CSOData/CSOData';
import { Chart } from 'chart.js/auto';


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

  chart: any;
  wagesChart: any;
  disposableIncomeChart: any;
  deductionsChart: any;


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
          console.log(res);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
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
