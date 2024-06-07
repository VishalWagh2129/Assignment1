import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Brand {
  id?: number;
  name: string;
  status: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class BrandService {


  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Save a new brand
  save(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(`${this.baseUrl}/saveBrand`, brand);
  }

  // Get all brands
  getAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.baseUrl}/getAllBrands`);
  }

  // Get a brand by ID
  getById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.baseUrl}/getBrandbyId/${id}`);
  }

  // Update an existing brand
  update(id: number, brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${this.baseUrl}/updateBrand/${id}`, brand);
  }

  // Delete a brand by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteBrand/${id}`);
  }
}
