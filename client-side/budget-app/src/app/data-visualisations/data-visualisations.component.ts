import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AvgEarningsResponseDTO } from './CSOData/CSOData';
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
  public data!: AvgEarningsResponseDTO;
  chart: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<AvgEarningsResponseDTO>(environment.goUrlAddress).subscribe(
      {
        next: (res: AvgEarningsResponseDTO) => {
          console.log(res);
          this.data = res;
          this.createChart();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }
  
  createChart(){
    this.chart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels:["Employees Wages", "Self Employed", "Retirement Pension", "Child Benefit", "Investment Income"],
        datasets:[
          {
            data: [this.data.EmployeesWages, this.data.SelfEmployeed, this.data.RetirementPension, this.data.ChildBenefit, this.data.InvestmentIncome]
          }
          // { label: "Employees Wages", data: this.data.EmployeesWages },
          // { label: "Self Employed", data: this.data.SelfEmployeed },
          // { label: "Retirement Pension", data: this.data.RetirementPension },
          // { label: "Child Benefit", data: this.data.ChildBenefit },
          // { label: "Investment Income", data: this.data.InvestmentIncome }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'AVerage income'
          }
        },
      }
    });
  }
}
