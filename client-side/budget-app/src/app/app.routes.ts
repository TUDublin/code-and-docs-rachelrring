import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetPlannerComponent } from './budget-planner/budget-planner.component';
import { DataVisualisationsComponent } from './data-visualisations/data-visualisations.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { LoginUserComponent } from './user/login-user/login-user.component';
import { PasswordResetComponent } from './user/password-reset/password-reset.component';
export const routes: Routes = [
    {path: 'budget-planner', component: BudgetPlannerComponent },
    {path: 'register', component: RegisterUserComponent },
    {path: 'login', component: LoginUserComponent },
    {path: 'reset-password', component: PasswordResetComponent },
    {path: '', component: DataVisualisationsComponent},
    {path: '**', component: DataVisualisationsComponent},
];
