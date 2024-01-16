import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
    }
  }
}
