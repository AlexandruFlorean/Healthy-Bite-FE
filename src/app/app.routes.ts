import { Routes } from '@angular/router';
import { AddMeal } from './pages/add-meal/add-meal';
import { SignIn } from './pages/sign-in/sign-in';
import { SignUp } from './pages/sign-up/sign-up';
import { NewIngredient } from './pages/new-ingredient/new-ingredient';
import { HomePage } from './pages/home-page/home-page';

export const routes: Routes = [
    {path: 'new-meal', component: AddMeal}, 
    {path: 'sign-in', component: SignIn},
    {path: 'sign-up', component: SignUp},
    {path: 'new-ingredient', component: NewIngredient},
    {path: 'home-page', component: HomePage}
];
