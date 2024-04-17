import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, Form, AbstractControl } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../shared/services/authentication.service';
import { BudgetToSaveDto } from '../_interfaces/user/budgetToSaveDto.model';
import { Router, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BudgetFields, BudgetFieldsCategories } from './budgetFormFields';

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
    HttpClientModule,
    RouterModule,
    MatTooltipModule,
  ],
  templateUrl: './budget-planner.component.html',
  styleUrl: './budget-planner.component.css'
})
export class BudgetPlannerComponent implements OnInit {

  myForm: FormGroup;
  chart: any;
  incomeChart: any;
  totalYearlyIncome: number = 0;
  totalYearlyExpenses: number = 0;
  totalYearlySurplus: number = 0;

  public isUserAuthenticated: boolean = false;
  public auth: boolean = false;

  public showCharts: boolean = false;

  private budgetFields: BudgetFields = {
    incomePay: 0,
    incomeBenefits: 0,
    incomePension: 0,
    incomeOther: 0,
    paymentMortgage: 0,
    paymentRent: 0,
    paymentHomeInsurance: 0,
    paymentHouseTax: 0,
    paymentHouseGas: 0,
    paymentElectricity: 0,
    paymentWater: 0,
    paymentHomePhone: 0,
    paymentMobilePhone: 0,
    paymentBroadband: 0,
    paymentTvLicense: 0,
    paymentHomeMaintenance: 0,
    paymentGroceries: 0,
    paymentTakeaways: 0,
    paymentCigarettes: 0,
    paymentEatingOut: 0,
    paymentClothing: 0,
    paymentChildcare: 0,
    paymentHealthandBeauty: 0,
    paymentEyeCare: 0,
    paymentDentalCare: 0,
    paymentMedicine: 0,
    paymentActivities: 0,
    paymentPocketMoney: 0,
    paymentChildSupport: 0,
    paymentSchoolFees: 0,
    paymentPetFood: 0,
    paymentVetBills: 0,
    paymentLifeInsurance: 0,
    paymentHealthInsurance: 0,
    paymentDentalInsurance: 0,
    paymentPetInsurance: 0,
    paymentCarInsurance: 0,
    paymentBankFees: 0,
    paymentLoan: 0,
    paymentCreditCard: 0,
    paymentHirePurchases: 0,
    paymentInvestments: 0,
    paymentPension: 0,
    paymentCarFuel: 0,
    paymentCarTax: 0,
    paymentCarMaintenance: 0,
    paymentPublicTransport: 0,
    paymentGym: 0,
    paymentStreamingServices: 0,
    paymentHolidays: 0,
    paymentOther: 0
  };

  private budgetFieldCategories: BudgetFieldsCategories = {
    income: 0,
    householdBills: 0,
    householdUtilities: 0,
    livingCosts: 0,
    friendsAndFamily: 0,
    pets: 0,
    insurance: 0,
    bankingAndInvestments: 0,
    travelAndLeisure: 0,
    otherExpenses: 0
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthenticationService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {
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
    const localStorage = document.defaultView?.localStorage;
    if (localStorage) {
      this.auth = true;
    }
  }

  ngOnInit(): void {
    if (this.auth) {
      this.isUserAuthenticated = this.authService.isUserAuthenticated();
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.fillInBudgetFields();
      this.calculateYearlyExpensesandIncome();
      // TODO: Fix this so that it doesn't continuously subtract and compound
      this.totalYearlySurplus = this.totalYearlyIncome - this.totalYearlyExpenses;
      this.updateDoughnutChart(this.budgetFieldCategories);
      this.updateIncomeDoughnutChart(this.budgetFields);
      this.showCharts = true;
    }
  }

  fillInBudgetFields() {
    this.budgetFields.incomePay = this.getYearlyValues('incomePay');
    this.budgetFields.incomeBenefits = this.getYearlyValues('incomeBenefits');
    this.budgetFields.incomePension = this.getYearlyValues('incomePension');
    this.budgetFields.incomeOther = this.getYearlyValues('incomeOther');
    this.budgetFields.paymentMortgage = this.getYearlyValues('paymentMortgage');
    this.budgetFields.paymentRent = this.getYearlyValues('paymentRent');
    this.budgetFields.paymentHomeInsurance = this.getYearlyValues('paymentHomeInsurance');
    this.budgetFields.paymentHouseTax = this.getYearlyValues('paymentHouseTax');
    this.budgetFields.paymentHouseGas = this.getYearlyValues('paymentHouseGas');
    this.budgetFields.paymentElectricity = this.getYearlyValues('paymentElectricity');
    this.budgetFields.paymentWater = this.getYearlyValues('paymentWater');
    this.budgetFields.paymentHomePhone = this.getYearlyValues('paymentHomePhone');
    this.budgetFields.paymentMobilePhone = this.getYearlyValues('paymentMobilePhone');
    this.budgetFields.paymentBroadband = this.getYearlyValues('paymentBroadband');
    this.budgetFields.paymentTvLicense = this.getYearlyValues('paymentTvLicense');
    this.budgetFields.paymentHomeMaintenance = this.getYearlyValues('paymentHomeMaintenance');
    this.budgetFields.paymentGroceries = this.getYearlyValues('paymentGroceries');
    this.budgetFields.paymentTakeaways = this.getYearlyValues('paymentTakeaways');
    this.budgetFields.paymentCigarettes = this.getYearlyValues('paymentCigarettes');
    this.budgetFields.paymentEatingOut = this.getYearlyValues('paymentEatingOut');
    this.budgetFields.paymentClothing = this.getYearlyValues('paymentClothing');
    this.budgetFields.paymentChildcare = this.getYearlyValues('paymentChildcare');
    this.budgetFields.paymentHealthandBeauty = this.getYearlyValues('paymentHealthandBeauty');
    this.budgetFields.paymentEyeCare = this.getYearlyValues('paymentEyeCare');
    this.budgetFields.paymentDentalCare = this.getYearlyValues('paymentDentalCare');
    this.budgetFields.paymentMedicine = this.getYearlyValues('paymentMedicine');
    this.budgetFields.paymentActivities = this.getYearlyValues('paymentActivities');
    this.budgetFields.paymentPocketMoney = this.getYearlyValues('paymentPocketMoney');
    this.budgetFields.paymentChildSupport = this.getYearlyValues('paymentChildSupport');
    this.budgetFields.paymentSchoolFees = this.getYearlyValues('paymentSchoolFees');
    this.budgetFields.paymentPetFood = this.getYearlyValues('paymentPetFood');
    this.budgetFields.paymentVetBills = this.getYearlyValues('paymentVetBills');
    this.budgetFields.paymentLifeInsurance = this.getYearlyValues('paymentLifeInsurance');
    this.budgetFields.paymentHealthInsurance = this.getYearlyValues('paymentHealthInsurance');
    this.budgetFields.paymentDentalInsurance = this.getYearlyValues('paymentDentalInsurance');
    this.budgetFields.paymentPetInsurance = this.getYearlyValues('paymentPetInsurance');
    this.budgetFields.paymentCarInsurance = this.getYearlyValues('paymentCarInsurance');
    this.budgetFields.paymentBankFees = this.getYearlyValues('paymentBankFees');
    this.budgetFields.paymentLoan = this.getYearlyValues('paymentLoan');
    this.budgetFields.paymentCreditCard = this.getYearlyValues('paymentCreditCard');
    this.budgetFields.paymentHirePurchases = this.getYearlyValues('paymentHirePurchases');
    this.budgetFields.paymentInvestments = this.getYearlyValues('paymentInvestments');
    this.budgetFields.paymentPension = this.getYearlyValues('paymentPension');
    this.budgetFields.paymentCarFuel = this.getYearlyValues('paymentCarFuel');
    this.budgetFields.paymentCarTax = this.getYearlyValues('paymentCarTax');
    this.budgetFields.paymentCarMaintenance = this.getYearlyValues('paymentCarMaintenance');
    this.budgetFields.paymentPublicTransport = this.getYearlyValues('paymentPublicTransport');
    this.budgetFields.paymentGym = this.getYearlyValues('paymentGym');
    this.budgetFields.paymentStreamingServices = this.getYearlyValues('paymentStreamingServices');
    this.budgetFields.paymentHolidays = this.getYearlyValues('paymentHolidays');
    this.budgetFields.paymentOther = this.getYearlyValues('paymentOther');
    this.fillInBudgetFieldCategories();
  }

  fillInBudgetFieldCategories() {
    this.budgetFieldCategories.income = this.budgetFields.incomePay
      + this.budgetFields.incomeBenefits
      + this.budgetFields.incomePension
      + this.budgetFields.incomeOther;
    this.budgetFieldCategories.householdBills = this.budgetFields.paymentMortgage
      + this.budgetFields.paymentRent
      + this.budgetFields.paymentHomeInsurance;
    this.budgetFieldCategories.householdUtilities = this.budgetFields.paymentHouseTax
      + this.budgetFields.paymentHouseGas
      + this.budgetFields.paymentElectricity
      + this.budgetFields.paymentWater
      + this.budgetFields.paymentHomePhone
      + this.budgetFields.paymentMobilePhone
      + this.budgetFields.paymentBroadband
      + this.budgetFields.paymentTvLicense
      + this.budgetFields.paymentHomeMaintenance;
    this.budgetFieldCategories.livingCosts = this.budgetFields.paymentGroceries +
      this.budgetFields.paymentTakeaways +
      this.budgetFields.paymentCigarettes +
      this.budgetFields.paymentEatingOut +
      this.budgetFields.paymentClothing +
      this.budgetFields.paymentChildcare +
      this.budgetFields.paymentHealthandBeauty +
      this.budgetFields.paymentEyeCare +
      this.budgetFields.paymentDentalCare +
      this.budgetFields.paymentMedicine;
    this.budgetFieldCategories.friendsAndFamily = this.budgetFields.paymentActivities +
      this.budgetFields.paymentPocketMoney +
      this.budgetFields.paymentChildSupport +
      this.budgetFields.paymentSchoolFees;
    this.budgetFieldCategories.pets = this.budgetFields.paymentPetFood + this.budgetFields.paymentVetBills;
    this.budgetFieldCategories.insurance = this.budgetFields.paymentLifeInsurance +
      this.budgetFields.paymentHealthInsurance +
      this.budgetFields.paymentDentalInsurance +
      this.budgetFields.paymentPetInsurance +
      this.budgetFields.paymentCarInsurance;
    this.budgetFieldCategories.bankingAndInvestments = this.budgetFields.paymentBankFees +
      this.budgetFields.paymentLoan +
      this.budgetFields.paymentCreditCard +
      this.budgetFields.paymentHirePurchases +
      this.budgetFields.paymentInvestments +
      this.budgetFields.paymentPension;
    this.budgetFieldCategories.travelAndLeisure = this.budgetFields.paymentCarFuel +
      this.budgetFields.paymentCarTax +
      this.budgetFields.paymentCarMaintenance +
      this.budgetFields.paymentPublicTransport +
      this.budgetFields.paymentGym +
      this.budgetFields.paymentStreamingServices +
      this.budgetFields.paymentHolidays;
    this.budgetFieldCategories.otherExpenses = this.budgetFields.paymentOther;
  }

  calculateYearlyExpensesandIncome() {
    this.totalYearlyIncome = this.budgetFieldCategories.income;
    Object.values(this.budgetFieldCategories).forEach(value => {
      this.totalYearlyExpenses += value;
    });
    this.totalYearlyExpenses = this.totalYearlyExpenses - this.totalYearlyIncome;
  }

  updateDoughnutChart(b: BudgetFieldsCategories) {
    const { income, ...categoriesWithoutIncome } = b;
    const keys: string[] = Object.keys(categoriesWithoutIncome)
    const values: number[] = Object.values(categoriesWithoutIncome);
    if (this.chart) {
      this.chart.data.labels = keys;
      this.chart.data.datasets[0].data = values;
      this.chart.update();
    } else {
      this.chart = new Chart('doughnutChart', {
        type: 'doughnut',
        data: {
          labels: keys,
          datasets: [{
            label: '€ spent',
            data: values,
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
            ],
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Expenses Breakdown'
            }
          },
        }
      });
    }
  }

  updateIncomeDoughnutChart(b: BudgetFields) {

    const { incomePay, incomeBenefits, incomePension, incomeOther, ...categoriesWithoutIncome } = b;

    const keys: string[] = ['Pay', 'Benefits', 'Pension', 'Other'];
    const values: number[] = [incomePay, incomeBenefits, incomePension, incomeOther];
    if (this.incomeChart) {
      this.incomeChart.data.labels = keys;
      this.incomeChart.data.datasets[0].data = values;
      this.incomeChart.update();
    } else {
      this.incomeChart = new Chart('incomeDoughnutChart', {
        type: 'doughnut',
        data: {
          labels: keys,
          datasets: [{
            label: '€ spent',
            data: values,
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
            ],
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Income Breakdown'
            }
          },
        }
      });
    }
  }

  getYearlyValues(controlField: string): number {
    let frequencyField = this.myForm.get(controlField.concat('Frequency'));
    let controlValue: number = this.myForm.get(controlField)?.value;
    if (frequencyField?.value == 'weekly') {
      return controlValue * 52;
    } else if (frequencyField?.value == 'monthly') {
      return controlValue * 12;
    }
    return controlValue * 1;
  }

  saveBudget() {

    var userEmail = this.authService.getUserEmail();

    var budgettosave: BudgetToSaveDto = {
      userEmail: userEmail,
      incomePay: this.budgetFields.incomePay,
      incomeBenefits: this.budgetFields.incomeBenefits,
      incomePension: this.budgetFields.incomePension,
      incomeOther: this.budgetFields.incomeOther,
      paymentMortgage: this.budgetFields.paymentMortgage,
      paymentRent: this.budgetFields.paymentRent,
      paymentHomeInsurance: this.budgetFields.paymentHomeInsurance,
      paymentHouseTax: this.budgetFields.paymentHouseTax,
      paymentHouseGas: this.budgetFields.paymentHouseGas,
      paymentElectricity: this.budgetFields.paymentElectricity,
      paymentWater: this.budgetFields.paymentWater,
      paymentHomePhone: this.budgetFields.paymentHomePhone,
      paymentMobilePhone: this.budgetFields.paymentMobilePhone,
      paymentBroadband: this.budgetFields.paymentBroadband,
      paymentTvLicense: this.budgetFields.paymentTvLicense,
      paymentHomeMaintenance: this.budgetFields.paymentHomeMaintenance,
      paymentGroceries: this.budgetFields.paymentGroceries,
      paymentTakeaways: this.budgetFields.paymentTakeaways,
      paymentCigarettes: this.budgetFields.paymentCigarettes,
      paymentEatingOut: this.budgetFields.paymentEatingOut,
      paymentClothing: this.budgetFields.paymentClothing,
      paymentChildcare: this.budgetFields.paymentChildcare,
      paymentHealthandBeauty: this.budgetFields.paymentHealthandBeauty,
      paymentEyeCare: this.budgetFields.paymentEyeCare,
      paymentDentalCare: this.budgetFields.paymentDentalCare,
      paymentMedicine: this.budgetFields.paymentMedicine,
      paymentActivities: this.budgetFields.paymentActivities,
      paymentPocketMoney: this.budgetFields.paymentPocketMoney,
      paymentChildSupport: this.budgetFields.paymentChildSupport,
      paymentSchoolFees: this.budgetFields.paymentSchoolFees,
      paymentPetFood: this.budgetFields.paymentPetFood,
      paymentVetBills: this.budgetFields.paymentVetBills,
      paymentLifeInsurance: this.budgetFields.paymentLifeInsurance,
      paymentHealthInsurance: this.budgetFields.paymentHealthInsurance,
      paymentDentalInsurance: this.budgetFields.paymentDentalInsurance,
      paymentPetInsurance: this.budgetFields.paymentPetInsurance,
      paymentCarInsurance: this.budgetFields.paymentCarInsurance,
      paymentBankFees: this.budgetFields.paymentBankFees,
      paymentLoan: this.budgetFields.paymentLoan,
      paymentCreditCard: this.budgetFields.paymentCreditCard,
      paymentHirePurchases: this.budgetFields.paymentHirePurchases,
      paymentInvestments: this.budgetFields.paymentInvestments,
      paymentPension: this.budgetFields.paymentPension,
      paymentCarFuel: this.budgetFields.paymentCarFuel,
      paymentCarTax: this.budgetFields.paymentCarTax,
      paymentCarMaintenance: this.budgetFields.paymentCarMaintenance,
      paymentPublicTransport: this.budgetFields.paymentPublicTransport,
      paymentGym: this.budgetFields.paymentGym,
      paymentStreamingServices: this.budgetFields.paymentStreamingServices,
      paymentHolidays: this.budgetFields.paymentHolidays,
      paymentOther: this.budgetFields.paymentOther,
      incomeTotal: this.totalYearlyIncome,
      paymentTotal: this.totalYearlyExpenses
    };
    this.authService.saveBudget("api/accounts/newbudget", budgettosave)
      .subscribe({
        next: (_) => {
          console.log("It Worked!")
          this.router.navigate(["/budget"])
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
        }

      });
  }
}
