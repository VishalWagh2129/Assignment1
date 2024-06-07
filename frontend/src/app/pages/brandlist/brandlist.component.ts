import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrandService } from '../../services/brand.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-brandlist',
  standalone: true,
  imports: [MatTableModule,CommonModule,RouterModule,MatIconModule],
  templateUrl: './brandlist.component.html',
  styleUrl: './brandlist.component.css'
})
export class BrandlistComponent implements OnInit {

  brandData:any=[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private brandService:BrandService,
    private snackBar : MatSnackBar,
  ) {
  }

  ngOnInit(){
    this.getAllBrands();
  }

  getAllBrands(){
    this.brandService.getAll().subscribe((res:any)=>{
      if(res.success){
        this.brandData = res.data;
      }
    });
  }

  deleteBrand(data){
    this.brandService.delete(data.ID).subscribe((res:any)=>{
      if(res.success){
        this.snackBar.open('Brand Deleted successfully', 'Close', {
          duration: 3000 // duration in milliseconds
        });
      }
      this.getAllBrands();
    });
  }

  brands = [
    { name: 'Brand 1', description: 'Description of Brand 1' },
    { name: 'Brand 2', description: 'Description of Brand 2' },
    // Add more brand details as needed
  ];
  displayedColumns: string[] = ['name', 'description','action'];

  editBrand(data){  
    this.router.navigate(['/dashboard/brand/add/'], { queryParams: { id: data.ID,mode:'edit'} });
  }

  addBrand(){
    this.router.navigate(['/dashboard/campaign/add'], {queryParams: { mode:'add'} });
  }

}
