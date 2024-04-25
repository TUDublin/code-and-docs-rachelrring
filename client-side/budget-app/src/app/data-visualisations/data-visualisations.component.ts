import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AvgEarningsResponseDTO, HS0672015Region } from './CSOData/CSOData';
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
  public dataAvgEarnings!: AvgEarningsResponseDTO;
  public datahs067!: HS0672015Region;

  chart: any;
  wagesChart: any;
  disposableIncomeChart: any;
  deductionsChart: any;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<AvgEarningsResponseDTO>(environment.goUrlAddress + '/averageEarnings').subscribe(
      {
        next: (res: AvgEarningsResponseDTO) => {
          this.dataAvgEarnings = res;
          this.createChart();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );

    this.http.get<HS0672015Region>(environment.goUrlAddress + '/hs067Region').subscribe(
      {
        next: (res: HS0672015Region) => {
          console.log(res);
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
  }

  createChart() {
    this.chart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ["Employees Wages", "Self Employed", "Retirement Pension", "Child Benefit", "Investment Income"],
        datasets: [
          {
            label: 'Income',
            data: [
              this.dataAvgEarnings.EmployeesWages,
              this.dataAvgEarnings.SelfEmployeed,
              this.dataAvgEarnings.RetirementPension,
              this.dataAvgEarnings.ChildBenefit,
              this.dataAvgEarnings.InvestmentIncome,
            ]
          }
        ]
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
            text: 'Average Household Income'
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
      }
    });
  }

  createChartHS067(data: HS0672015Region) {
    // Assuming you have a predefined list of income types that matches your data
    const excludedIncomeType = "Employees-wages/salaries";
    const incomeTypes = ["Self-employed income", "Retirement pensions", "Investment income", "Property income", "Child benefit", "Other direct income"]; // Define all other types  


    const datasets = Object.keys(data).map(regionKey => {
      const regionData = data[regionKey as keyof HS0672015Region];
      const dataValues = incomeTypes.map(incomeType => {
        const incomeData = regionData.find(row => row.IncomeType === incomeType);
        return incomeData ? incomeData.Value : 0; // If not found, use 0
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
              display: true, // If you want to show the y-axis title
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
            text: 'Average Monthly Household Income by Region and Income Type',
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

    this.chart.render();
  }

  createGrossIncomeChart(data: HS0672015Region) {
    const incomeType = "Gross income (A+B)"; // Specify the exact income type label

    const datasets = Object.keys(data).map(regionKey => {
      const regionData = data[regionKey as keyof HS0672015Region];
      const incomeData = regionData.find(row => row.IncomeType === incomeType);
      const value = incomeData ? incomeData.Value : 0; // If not found, use 0 as value

      return {
        label: regionKey,
        data: [value],
      };
    });

    this.wagesChart = new Chart('wagesChart', {
      type: 'bar',
      data: {
        labels: [incomeType],
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
            text: "Average Gross Income by Region",
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
      }
    });
    this.wagesChart.render();
  }

  createDisposableIncomeChart(data: HS0672015Region) {
    const incomeType = "Disposable income (A+B-C)"; // Specify the exact income type label
  
    const datasets = Object.keys(data).map(regionKey => {
      const regionData = data[regionKey as keyof HS0672015Region];
      const incomeData = regionData.find(row => row.IncomeType === incomeType);
      const value = incomeData ? incomeData.Value : 0; // If not found, use 0 as value
  
      return {
        label: regionKey,
        data: [value],
      };
    });
  
    this.disposableIncomeChart = new Chart('disposableIncomeChart', {
      type: 'bar',
      data: {
        labels: [incomeType],
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
            text: "Average Disposable Income by Region",
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
      }
    });
  
    this.disposableIncomeChart.render();
  }



  createDeductionsChart(data: HS0672015Region) {
    const incomeType = "Income tax & social insurance deductions (C)"; // Specify the exact income type label

    const datasets = Object.keys(data).map(regionKey => {
      const regionData = data[regionKey as keyof HS0672015Region];
      const incomeData = regionData.find(row => row.IncomeType === incomeType);
      const value = incomeData ? incomeData.Value : 0; // If not found, use 0 as value

      return {
        label: regionKey,
        data: [value],
      };
    });

    this.wagesChart = new Chart('deductionsChart', {
      type: 'bar',
      data: {
        labels: [incomeType],
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
            text: "Average Income tax & social insurance deductions by Region",
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
      }
    });
    this.deductionsChart.render();
  }
  
}
