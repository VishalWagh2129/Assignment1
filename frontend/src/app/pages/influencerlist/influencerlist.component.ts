import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfluencerService } from '../../services/influencer.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-influencerlist',
  standalone: true,
  imports: [MatTableModule,CommonModule,RouterModule,MatIconModule],
  templateUrl: './influencerlist.component.html',
  styleUrl: './influencerlist.component.css'
})
export class InfluencerlistComponent {

  influencerData:any=[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private influencerService:InfluencerService,
    private snackBar:MatSnackBar
  ) {
  }

  ngOnInit(){
    this.getAllInfluencers();
  }

  getAllInfluencers(){
    this.influencerService.getAll().subscribe((res:any)=>{
      if(res.success){
        this.influencerData = res.data;
      }
    });
  }

  brands = [
    { name: 'Brand 1', description: 'Description of Brand 1' },
    { name: 'Brand 2', description: 'Description of Brand 2' },
    // Add more brand details as needed
  ];
  displayedColumns: string[] = ['name', 'description','email','gender','location','action'];

  editInfluencer(data){
    this.router.navigate(['/dashboard/influencer/add/'], { queryParams: { id: data.ID,mode:'edit'} });
  }

  deleteInfluencer(data){
    this.influencerService.delete(data.ID).subscribe((res:any)=>{
      if(res.success){
        this.snackBar.open('Influencer Deleted successfully', 'Close', {
          duration: 3000 // duration in milliseconds
        });
      }
      this.getAllInfluencers();
    });
  }

  addInfluencer(){
    this.router.navigate(['/dashboard/influencer/add'], {queryParams: { mode:'add'} });
  }

}
