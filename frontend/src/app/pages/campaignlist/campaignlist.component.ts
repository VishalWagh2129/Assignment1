import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CampaignService } from '../../services/campaign.service';


@Component({
  selector: 'app-campaignlist',
  standalone: true,
  imports: [MatTableModule,CommonModule,RouterModule,MatIconModule],
  templateUrl: './campaignlist.component.html',
  styleUrl: './campaignlist.component.css'
})
export class CampaignlistComponent implements OnInit {

  campaignData:any=[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar : MatSnackBar,
    private campaignService:CampaignService
  ) {
  }

  ngOnInit(){
    this.getAllCampaigns();
  }

  getAllCampaigns(){
    this.campaignService.getAll().subscribe((res:any)=>{
      if(res.success){
        this.campaignData = res.data;
      }
    });
  }

  deleteBrand(data){
    this.campaignService.delete(data.ID).subscribe((res:any)=>{
      if(res.success){
        this.snackBar.open('Brand Deleted successfully', 'Close', {
          duration: 3000 // duration in milliseconds
        });
      }
      this.getAllCampaigns();
    });
  }


  displayedColumns: string[] = ['name', 'description','brand','action'];

  editCampaign(data){
    this.router.navigate(['/dashboard/campaign/add/'], { queryParams: { id: data.ID,mode:'edit'} });
  }

  deleteCampaign(data){
    this.campaignService.delete(data.ID).subscribe((res:any)=>{
      if(res.success){
        this.snackBar.open('Campaign Deleted successfully', 'Close', {
          duration: 3000 // duration in milliseconds
        });
      }
      this.getAllCampaigns();
    });
  }


  addCampaign(){
    this.router.navigate(['/dashboard/campaign/add'], {queryParams: { mode:'add'} });
  }

}
