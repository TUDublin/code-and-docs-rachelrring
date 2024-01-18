import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
      incomePay: ['', Validators.required],
      incomeBenefits: ['', Validators.required],
      incomePension: ['', Validators.required],
      incomeOther: ['', Validators.required],

      paymentMortgage: ['', Validators.required],
      paymentRent: ['', Validators.required],
      paymentHomeInsurance: ['', Validators.required],

      paymentHouseTax: ['', Validators.required],
      paymentHouseGas: ['', Validators.required],
      paymentElectricity: ['', Validators.required],
      paymentWater: ['', Validators.required],
      paymentHomePhone: ['', Validators.required],
      paymentMobilePhone: ['', Validators.required],
      paymentBroadband: ['', Validators.required],
      paymentTvLicense: ['', Validators.required],
      paymentHomeMaintenance: ['', Validators.required],

      paymentGroceries: ['', Validators.required],
      paymentTakeaways: ['', Validators.required],
      paymentCigarettes: ['', Validators.required],
      paymentEatingOut: ['', Validators.required],
      paymentClothing: ['', Validators.required],
      paymentChildcare: ['', Validators.required],
      paymentHealthandBeauty: ['', Validators.required],
      paymentEyeCare: ['', Validators.required],
      paymentDentalCare: ['', Validators.required],
      paymentMedicine: ['', Validators.required],

      paymentActivities: ['', Validators.required],
      paymentPocketMoney: ['', Validators.required],
      paymentChildSupport: ['', Validators.required],
      paymentSchoolFees: ['', Validators.required],

      paymentPetFood: ['', Validators.required],
      paymentVetBills: ['', Validators.required],

      paymentLifeInsurance: ['', Validators.required],
      paymentHealthInsurance: ['', Validators.required],
      paymentDentalInsurance: ['', Validators.required],
      paymentPetInsurance: ['', Validators.required],
      paymentCarInsurance: ['', Validators.required],

      paymentBankFees: ['', Validators.required],
      paymentLoan: ['', Validators.required],
      paymentCreditCard: ['', Validators.required],
      paymentHirePurchases: ['', Validators.required],
      paymentInvestments: ['', Validators.required],
      paymentPension: ['', Validators.required],

      paymentCarFuel: ['', Validators.required],
      paymentCarTax: ['', Validators.required],
      paymentCarMaintenance: ['', Validators.required],
      paymentPublicTransport: ['', Validators.required],
      paymentGym: ['', Validators.required],
      paymentStreamingServices: ['', Validators.required],
      paymentHolidays: ['', Validators.required],
    });
   }

   onSubmit() {
    if (this.myForm.valid) {
      // Process the form data here
      console.log(this.myForm.value);
      const formData = this.myForm.value;
      const chartData = Object.values(formData).map(Number);
      const chartLabels = Object.keys(formData);
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
}
