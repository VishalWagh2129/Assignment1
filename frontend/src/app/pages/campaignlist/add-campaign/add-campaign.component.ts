import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CampaignService } from '../../../services/campaign.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-campaign',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,MatSelectModule,FormsModule,ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './add-campaign.component.html',
  styleUrl: './add-campaign.component.css'
})
export class AddCampaignComponent {

  campaignForm:FormGroup;
  submitted: boolean = false;
  campaignId:any;
  mode:any;
  campaignDetailData:any;
  influencersData:any = [];
  brandsData:any=[];

  constructor(private fb: FormBuilder,
    private campaignService:CampaignService,
    private router : Router,
    private SnackBar:MatSnackBar,
    private activatedRoute : ActivatedRoute
  ) { }

  influencers:any;
  brands:any;

  ngOnInit() {
    this.getAllBrands();
    this.getAllInfluencers();
    this.activatedRoute.queryParams.subscribe((params:any) => {
      if (!!params.id) {
        this.campaignId = params.id;
        this.mode = params.mode;
        this.getCampaignDetailsById(this.campaignId);
      }
    });
    this.campaignForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      brand: ['', Validators.required],
      influencer: ['', Validators.required]
    });
  }

  getAllInfluencers(){
    this.campaignService.getAllInfluencers().subscribe((res:any)=>{
      if(res.success){
        this.influencersData = res.data;
      }
    });
  }

  getAllBrands(){
    this.campaignService.getAllBrands().subscribe((res:any)=>{
      if(res.success){
        this.brandsData = res.data;
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.campaignForm.valid) {
      this.campaignService.save(this.campaignForm.value).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('campaign saved successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/dashboard/campaign']);
        } else {
          this.SnackBar.open('Error While Saving campaign', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  onUpdate(){
    this.submitted = true;
    if (this.campaignForm.valid) {
      this.campaignService.update(this.campaignId,this.campaignForm.value).subscribe((res: any) => {
        if (res.success) {
          this.SnackBar.open('Campaign Updated successfully', 'Close', {
            duration: 3000 // duration in milliseconds
          });
          this.router.navigate(['/dashboard/campaign']);
        } else {
          this.SnackBar.open('Error While Updating Campaign', 'Close', {
            duration: 3000 // duration in milliseconds
          });
        }
      }
      );
    }
  }

  getCampaignDetailsById(id){
    this.campaignService.getById(id).subscribe((res:any)=>{
      if(res.success){
        this.campaignDetailData = res.data;
        this.setData(res.data);
      }
    })
  }

  setData(data){
    if(this.mode === 'edit'){
      this.campaignForm.get('name').setValue(data.Campign_Name);
      this.campaignForm.get('description').setValue(data.Description);
      this.campaignForm.get('status').setValue(data.Status);
      this.campaignForm.get('brand').setValue(data.Brand);
      this.campaignForm.get('influencer').setValue(JSON.parse(data.Influencers));
    }
  }


}
