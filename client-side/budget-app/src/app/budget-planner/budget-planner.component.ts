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
      incomePay: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      incomeBenefits: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      incomePension: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      incomeOther: [0.00, [
        Validators.required, Validators.min(0),
      ]],

      paymentMortgage: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentRent: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHomeInsurance: [0.00, [
        Validators.required, Validators.min(0),
      ]],

      paymentHouseTax: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHouseGas: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentElectricity: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentWater: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHomePhone: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentMobilePhone: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentBroadband: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentTvLicense: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHomeMaintenance: [0.00, [
        Validators.required, Validators.min(0),
      ]],

      paymentGroceries: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentTakeaways: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentCigarettes: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentEatingOut: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentClothing: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentChildcare: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHealthandBeauty: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentEyeCare: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentDentalCare: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentMedicine: [0.00, [
        Validators.required, Validators.min(0),
      ]],

      paymentActivities: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentPocketMoney: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentChildSupport: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentSchoolFees: [0.00, [
        Validators.required, Validators.min(0),
      ]],

      paymentPetFood: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentVetBills: [0.00, [
        Validators.required, Validators.min(0),
      ]],

      paymentLifeInsurance: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHealthInsurance: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentDentalInsurance: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentPetInsurance: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentCarInsurance: [0.00, [
        Validators.required, Validators.min(0),
      ]],

      paymentBankFees: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentLoan: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentCreditCard: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHirePurchases: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentInvestments: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentPension: [0.00, [
        Validators.required, Validators.min(0),
      ]],

      paymentCarFuel: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentCarTax: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentCarMaintenance: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentPublicTransport: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentGym: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentStreamingServices: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHolidays: [0.00, [
        Validators.required, Validators.min(0),
      ]],

      paymentOther: [0.00, [
        Validators.required, Validators.min(0),
      ]],
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
              'rgba(0, 255, 255, 1)',
              'rgba(255, 0, 255, 1)',
              'rgba(255, 255, 0, 1)',
              'rgba(129, 255, 255, 1)',
              'rgba(255, 133, 255, 1)',
              'rgba(255, 255, 134, 1)',
              'rgba(121, 124, 255, 1)',
              'rgba(121, 255, 125, 1)',
              'rgba(255, 127, 128, 1)',
              'rgba(127, 127, 128, 1)',
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
