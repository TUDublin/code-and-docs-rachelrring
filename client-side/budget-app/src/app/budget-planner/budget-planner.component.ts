import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-budget-planner',
  standalone: true,
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './budget-planner.component.html',
  styleUrl: './budget-planner.component.css'
})
export class BudgetPlannerComponent {

  myForm: FormGroup;
  chart: any;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      incomePay: [0.00, Validators.required],
      incomeBenefits: [0.00, Validators.required],
      incomePension: [0.00, Validators.required],
      incomeOther: [0.00, Validators.required],

      paymentMortgage: [0.00, Validators.required],
      paymentRent: [0.00, Validators.required],
      paymentHomeInsurance: [0.00, Validators.required],

      paymentHouseTax: [0.00, Validators.required],
      paymentHouseGas: [0.00, Validators.required],
      paymentElectricity: [0.00, Validators.required],
      paymentWater: [0.00, Validators.required],
      paymentHomePhone: [0.00, Validators.required],
      paymentMobilePhone: [0.00, Validators.required],
      paymentBroadband: [0.00, Validators.required],
      paymentTvLicense: [0.00, Validators.required],
      paymentHomeMaintenance: [0.00, Validators.required],

      paymentGroceries: [0.00, Validators.required],
      paymentTakeaways: [0.00, Validators.required],
      paymentCigarettes: [0.00, Validators.required],
      paymentEatingOut: [0.00, Validators.required],
      paymentClothing: [0.00, Validators.required],
      paymentChildcare: [0.00, Validators.required],
      paymentHealthandBeauty: [0.00, Validators.required],
      paymentEyeCare: [0.00, Validators.required],
      paymentDentalCare: [0.00, Validators.required],
      paymentMedicine: [0.00, Validators.required],

      paymentActivities: [0.00, Validators.required],
      paymentPocketMoney: [0.00, Validators.required],
      paymentChildSupport: [0.00, Validators.required],
      paymentSchoolFees: [0.00, Validators.required],

      paymentPetFood: [0.00, Validators.required],
      paymentVetBills: [0.00, Validators.required],

      paymentLifeInsurance: [0.00, Validators.required],
      paymentHealthInsurance: [0.00, Validators.required],
      paymentDentalInsurance: [0.00, Validators.required],
      paymentPetInsurance: [0.00, Validators.required],
      paymentCarInsurance: [0.00, Validators.required],

      paymentBankFees: [0.00, Validators.required],
      paymentLoan: [0.00, Validators.required],
      paymentCreditCard: [0.00, Validators.required],
      paymentHirePurchases: [0.00, Validators.required],
      paymentInvestments: [0.00, Validators.required],
      paymentPension: [0.00, Validators.required],

      paymentCarFuel: [0.00, Validators.required],
      paymentCarTax: [0.00, Validators.required],
      paymentCarMaintenance: [0.00, Validators.required],
      paymentPublicTransport: [0.00, Validators.required],
      paymentGym: [0.00, Validators.required],
      paymentStreamingServices: [0.00, Validators.required],
      paymentHolidays: [0.00, Validators.required],

      paymentOther: [0.00, Validators.required],
    });
   }

   onSubmit() {
    if (this.myForm.valid) {
      // Process the form data here
      console.log(this.myForm.value);
      const formData = this.myForm.value;
      const chartData = this.getChartData(Object.values(formData).map(Number)) ;
      const chartLabels = [
        "Income", 
        "Household Bills", 
        "Household Utilities", 
        "Living Costs", 
        "Friends and Family", 
        "Pets", 
        "Insurance", 
        "Banking and Investments",
        "Travel and Leisure", 
        "Other",
      ];
      // Create or update the doughnut chart
      this.updateDoughnutChart(chartLabels, chartData);
    }
  }

  updateDoughnutChart(labels: string[], data: number[]) {
    if (this.chart) {
      // If the chart already exists, update its data
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = data;
      this.chart.update();
    } else {
      // If the chart doesn't exist, create a new doughnut chart
      this.chart = new Chart('doughnutChart', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 255, 255, 0.6)',
              'rgba(0, 0, 0, 0.6)',
            ],
          }]
        }
      });
    }
  }

  getChartData(cd: number[]){
    let chartData:number[] = [];
    // add income to chartData
    chartData.push(cd.slice(0,4).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    // add HouseholdBills to chartData
    chartData.push(cd.slice(4,7).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    // add Household utilities to chartData
    chartData.push(cd.slice(7, 16).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    // add living costs to chartData
    chartData.push(cd.slice(16,26).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    // add friends and family to chartData
    chartData.push(cd.slice(26, 30).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    // add pets to chartData
    chartData.push(cd.slice(30, 32).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    // add insurance to chartData
    chartData.push(cd.slice(32, 37).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    // add banking investments to chartData
    chartData.push(cd.slice(37, 43).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    // add travel and leisure to chartData
    chartData.push(cd.slice(43, 50).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    // add other to chartData
    chartData.push(cd.slice(50).reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    return chartData;
  }
}
