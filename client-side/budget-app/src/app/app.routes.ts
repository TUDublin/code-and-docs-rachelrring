import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetPlannerComponent } from './budget-planner/budget-planner.component';
import { RouterLink } from '@angular/router';

export const routes: Routes = [
    {path: 'budget-planner', component: BudgetPlannerComponent },
];
