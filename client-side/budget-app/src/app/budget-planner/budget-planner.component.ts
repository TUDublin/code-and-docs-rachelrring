import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, Form, AbstractControl } from '@angular/forms';
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
    MatSelectModule,
  ],
  templateUrl: './budget-planner.component.html',
  styleUrl: './budget-planner.component.css'
})
export class BudgetPlannerComponent {

  myForm: FormGroup;
  chart: any;
  totalIncome: number = 0;
  totalYearlyExpenses: number = 0;

  fields: string[] = [
    'incomePay',
    'incomeBenefits',
    'incomePension',
    'incomeOther',
    'paymentMortgage',
    'paymentRent',
    'paymentHomeInsurance',
    'paymentHouseTax',
    'paymentHouseGas',
    'paymentElectricity',
    'paymentWater',
    'paymentHomePhone',
    'paymentMobilePhone',
    'paymentBroadband',
    'paymentTvLicense',
    'paymentHomeMaintenance',
    'paymentGroceries',
    'paymentTakeaways',
    'paymentCigarettes',
    'paymentEatingOut',
    'paymentClothing',
    'paymentChildcare',
    'paymentHealthandBeauty',
    'paymentEyeCare',
    'paymentDentalCare',
    'paymentMedicine',
    'paymentActivities',
    'paymentPocketMoney',
    'paymentChildSupport',
    'paymentSchoolFees',
    'paymentPetFood',
    'paymentVetBills',
    'paymentLifeInsurance',
    'paymentHealthInsurance',
    'paymentDentalInsurance',
    'paymentPetInsurance',
    'paymentCarInsurance',
    'paymentBankFees',
    'paymentLoan',
    'paymentCreditCard',
    'paymentHirePurchases',
    'paymentInvestments',
    'paymentPension',
    'paymentCarFuel',
    'paymentCarTax',
    'paymentCarMaintenance',
    'paymentPublicTransport',
    'paymentGym',
    'paymentStreamingServices',
    'paymentHolidays',
    'paymentOther',
  ]  

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      incomePay: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      incomePayFrequency: ['weekly', Validators.required],
      incomeBenefits: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      incomeBenefitsFrequency: ['weekly', Validators.required],
      incomePension: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      incomePensionFrequency: ['weekly', Validators.required],
      incomeOther: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      incomeOtherFrequency: ['weekly', Validators.required],

      paymentMortgage: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentMortgageFrequency: ['weekly', Validators.required],
      paymentRent: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentRentFrequency: ['weekly', Validators.required],
      paymentHomeInsurance: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHomeInsuranceFrequency: ['weekly', Validators.required],

      paymentHouseTax: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHouseTaxFrequency: ['weekly', Validators.required],
      paymentHouseGas: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHouseGasFrequency: ['weekly', Validators.required],
      paymentElectricity: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentElectricityFrequency: ['weekly', Validators.required],
      paymentWater: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentWaterFrequency: ['weekly', Validators.required],
      paymentHomePhone: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHomePhoneFrequency: ['weekly', Validators.required],
      paymentMobilePhone: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentMobilePhoneFrequency: ['weekly', Validators.required],
      paymentBroadband: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentBroadbandFrequency: ['weekly', Validators.required],
      paymentTvLicense: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentTvLicenseFrequency: ['weekly', Validators.required],
      paymentHomeMaintenance: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHomeMaintenanceFrequency: ['weekly', Validators.required],

      paymentGroceries: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentGroceriesFrequency: ['weekly', Validators.required],
      paymentTakeaways: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentTakeawaysFrequency: ['weekly', Validators.required],
      paymentCigarettes: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentCigarettesFrequency: ['weekly', Validators.required],
      paymentEatingOut: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentEatingOutFrequency: ['weekly', Validators.required],
      paymentClothing: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentClothingFrequency: ['weekly', Validators.required],
      paymentChildcare: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentChildcareFrequency: ['weekly', Validators.required],
      paymentHealthandBeauty: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHealthandBeautyFrequency: ['weekly', Validators.required],
      paymentEyeCare: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentEyeCareFrequency: ['weekly', Validators.required],
      paymentDentalCare: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentDentalCareFrequency: ['weekly', Validators.required],
      paymentMedicine: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentMedicineFrequency: ['weekly', Validators.required],

      paymentActivities: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentActivitiesFrequency: ['weekly', Validators.required],
      paymentPocketMoney: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentPocketMoneyFrequency: ['weekly', Validators.required],
      paymentChildSupport: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentChildSupportFrequency: ['weekly', Validators.required],
      paymentSchoolFees: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentSchoolFeesFrequency: ['weekly', Validators.required],

      paymentPetFood: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentPetFoodFrequency: ['weekly', Validators.required],
      paymentVetBills: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentVetBillsFrequency: ['weekly', Validators.required],

      paymentLifeInsurance: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentLifeInsuranceFrequency: ['weekly', Validators.required],
      paymentHealthInsurance: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHealthInsuranceFrequency: ['weekly', Validators.required],
      paymentDentalInsurance: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentDentalInsuranceFrequency: ['weekly', Validators.required],
      paymentPetInsurance: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentPetInsuranceFrequency: ['weekly', Validators.required],
      paymentCarInsurance: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentCarInsuranceFrequency: ['weekly', Validators.required],

      paymentBankFees: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentBankFeesFrequency: ['weekly', Validators.required],
      paymentLoan: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentLoanFrequency: ['weekly', Validators.required],
      paymentCreditCard: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentCreditCardFrequency: ['weekly', Validators.required],
      paymentHirePurchases: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHirePurchasesFrequency: ['weekly', Validators.required],
      paymentInvestments: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentInvestmentsFrequency: ['weekly', Validators.required],
      paymentPension: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentPensionFrequency: ['weekly', Validators.required],

      paymentCarFuel: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentCarFuelFrequency: ['weekly', Validators.required],
      paymentCarTax: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentCarTaxFrequency: ['weekly', Validators.required],
      paymentCarMaintenance: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentCarMaintenanceFrequency: ['weekly', Validators.required],
      paymentPublicTransport: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentPublicTransportFrequency: ['weekly', Validators.required],
      paymentGym: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentGymFrequency: ['weekly', Validators.required],
      paymentStreamingServices: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentStreamingServicesFrequency: ['weekly', Validators.required],
      paymentHolidays: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentHolidaysFrequency: ['weekly', Validators.required],

      paymentOther: [0.00, [
        Validators.required, Validators.min(0),
      ]],
      paymentOtherFrequency: ['weekly', Validators.required],
    });
   }

   onSubmit() {
    if (this.myForm.valid) {
      let chartData: number[] = [];
      const formData = this.myForm.value;
      for (let i = 0; i < this.fields.length; i++){
        chartData.push(this.getYearlyValues(this.fields[i]))
      }
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
      this.updateDoughnutChart(chartLabels, chartData);
      this.totalIncome = chartData.slice(0,4).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      this.totalYearlyExpenses = chartData.slice(4,51).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    }
  }

  updateDoughnutChart(labels: string[], data: number[]) {
    if (this.chart) {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = data;
      this.chart.update();
    } else {
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

  getChartData(cd: number[]): number[]{
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

  getYearlyValues(controlField: string): number{
    let frequencyField = this.myForm.get(controlField.concat('Frequency'));
    let controlValue: number = this.myForm.get(controlField)?.value;
    if (frequencyField?.value == 'weekly'){
      return controlValue * 52;
    } else if (frequencyField?.value == 'monthly'){
      return controlValue * 12;
    }
    return controlValue;
  }
}
