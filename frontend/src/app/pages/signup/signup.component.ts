import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username:['',[Validators.required]],
      mobile:['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { username, mobile, email, password } = this.signupForm.value;
      this.authService.signup(username, mobile, email, password).subscribe((success:any) =>{
        if(success){
          alert('Sign Up Successful');
          this.router.navigate(['/login']);
        }else{
          alert('Sign Up UnSuccessful');
        }
      });
    }
  }

}
