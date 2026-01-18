import { Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginUserDto } from '../../models/loginUserDto';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})

export class SignIn implements OnInit {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  signInForm!: FormGroup;
  userId: string | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,  
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSignIn() {
    if (this.signInForm.invalid) {
      console.log('Sign-In Form is invalid');
      return;
    }

    const formData = this.signInForm.value;
    const loginUserDto: LoginUserDto = {
      email: formData.email,
      password: formData.password,
    };  

    this.authService.login(loginUserDto).subscribe(userId => {
      this.userId = userId;
      console.log('Login to userId:', userId);
      this.router.navigate(['/home-page']);
    });

  }

  
}


