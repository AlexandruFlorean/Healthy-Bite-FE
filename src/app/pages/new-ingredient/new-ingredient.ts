import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterIngredientsDto } from '../../models/register-ingredients.model';
import { AddIngredientService } from '../../services/addIngredient.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-ingredient',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterModule],
  templateUrl: './new-ingredient.html',
  styleUrl: './new-ingredient.css',
})
export class NewIngredient {
  addIngredientForm!: FormGroup;
  registeredIngredientId: string | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly addIngredientService: AddIngredientService,
    private router: Router
  ) {}

  ngOnInit (): void {
    this.addIngredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      calories: ['', Validators.required],
      proteins: ['', Validators.required]
    });
  }

  addIngredient() {
    if (this.addIngredientForm.invalid) {
      console.log('Add Ingredient Form is invalid');
      return
    }

    const formData = this.addIngredientForm.value;
    const registerIngredientsDto: RegisterIngredientsDto = {
      name: formData.name,
      calories: formData.calories,
      proteins: formData.proteins
    }; 

    this.addIngredientService.addIngredient(registerIngredientsDto).subscribe((ingredientDto) => {
      this.registeredIngredientId = ingredientDto.id;
      console.log('Ingredient added successfully with ID:', this.registeredIngredientId);
    });
    this.router.navigate(['/new-meal']);
  }

}
