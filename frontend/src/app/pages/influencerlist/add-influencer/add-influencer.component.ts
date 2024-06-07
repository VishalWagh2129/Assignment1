import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InfluencerService } from '../../../services/influencer.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-add-influencer',
  standalone: true,
  imports: [MatRadioModule,MatInputModule,MatFormFieldModule,MatSelectModule,MatButtonModule,FormsModule,ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './add-influencer.component.html',
  styleUrl: './add-influencer.component.css'
})
export class AddInfluencerComponent {

  influencerForm:FormGroup;
  influencerId:any;
  mode:any;
  submitted:boolean= false;
  influencerDetailData:any;

  constructor(private fb: FormBuilder,
    private influencerService:InfluencerService,
    private router : Router,
    private SnackBar:MatSnackBar,
    private activatedRoute : ActivatedRoute
  ) { }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params:any) => {
      if (!!params.id) {
        this.influencerId = params.id;
        this.mode = params.mode;
        this.getInfluencerDetailsById(this.influencerId);
      }
    });
    this.influencerForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', Validators.required],
      location: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.influencerForm.valid) {
      this.influencerService.save(this.influencerForm.value).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('Brand saved successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/dashboard/influencer']);
        } else {
          this.SnackBar.open('Error While Saving Brand', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  onUpdate(){
    this.submitted = true;
    if (this.influencerForm.valid) {
      this.influencerService.update(this.influencerId,this.influencerForm.value).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('influencer Updated successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/dashboard/influencer']);
        } else {
          this.SnackBar.open('Error While Updating influencer', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  getInfluencerDetailsById(id){
    this.influencerService.getById(id).subscribe((res:any)=>{
      if(res.success){
        this.influencerDetailData = res.data;
        this.setData(res.data);
      }
    })
  }

  setData(data){
    if(this.mode === 'edit'){
      this.influencerForm.get('name').setValue(data.Name);
      this.influencerForm.get('description').setValue(data.Description);
      this.influencerForm.get('status').setValue(data.Status);
      this.influencerForm.get('email').setValue(data.Email);
      this.influencerForm.get('location').setValue(data.Location);
      this.influencerForm.get('gender').setValue(data.Gender);
    }
  }

}
