import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { RegisterUserDto } from '../../models/register-user-dto.model';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp implements OnInit {

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  signUpForm!: FormGroup;
  registeredUserId: string | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private router: Router,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSignUp() {
    if (this.signUpForm.invalid) {
      console.log('Sign-Up Form is invalid');
      return;
    }

    const formData = this.signUpForm.value;
    const registerUserDto: RegisterUserDto = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phone,
    };

    this.authService.register(registerUserDto)
    .subscribe(userDto => {
      this.registeredUserId = userDto.id;
      console.log('Registered User ID:', userDto.id);
    });

    console.log('User registered successfully' + this.registeredUserId);
    this.router.navigate(['/sign-in']);

  }
}
