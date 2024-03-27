import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetPlannerComponent } from './budget-planner/budget-planner.component';
import { DataVisualisationsComponent } from './data-visualisations/data-visualisations.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';

export const routes: Routes = [
    {path: 'budget-planner', component: BudgetPlannerComponent },
    {path: 'register', component: RegisterUserComponent },
    {path: '', component: DataVisualisationsComponent},
    {path: '**', component: DataVisualisationsComponent},
];
