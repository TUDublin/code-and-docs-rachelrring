import { Routes } from '@angular/router';
import { BudgetPlannerComponent } from './budget-planner/budget-planner.component';
import { DataVisualisationsComponent } from './data-visualisations/data-visualisations.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { LoginUserComponent } from './user/login-user/login-user.component';
import { PasswordResetComponent } from './user/password-reset/password-reset.component';
import { UserBudgetComponent } from './user/user-budget/user-budget.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
export const routes: Routes = [
    {path: 'budget-planner', component: BudgetPlannerComponent },
    {path: 'register', component: RegisterUserComponent },
    {path: 'login', component: LoginUserComponent },
    {path: 'reset-password', component: PasswordResetComponent },
    {path: 'budget', component: UserBudgetComponent },
    {path: 'visualisations', component: DataVisualisationsComponent},
    {path: 'home', component: WelcomePageComponent},
    {path: '**', component: WelcomePageComponent},
];
