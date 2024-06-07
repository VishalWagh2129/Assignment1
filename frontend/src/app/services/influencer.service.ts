import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Influencer {
  id?: number;
  name: string;
  email:string;
  gender:string;
  location:string;
  status: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class InfluencerService {


  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Save a new brand
  save(influencer: Influencer): Observable<Influencer> {
    return this.http.post<Influencer>(`${this.baseUrl}/saveInfluencer`, influencer);
  }

  // Get all brands
  getAll(): Observable<Influencer[]> {
    return this.http.get<Influencer[]>(`${this.baseUrl}/getAllInfluencers`);
  }

  // Get a brand by ID
  getById(id: number): Observable<Influencer> {
    return this.http.get<Influencer>(`${this.baseUrl}/getInfluencerbyId/${id}`);
  }

  // Update an existing brand
  update(id: number, influencer: Influencer): Observable<Influencer> {
    return this.http.put<Influencer>(`${this.baseUrl}/updateInfluencer/${id}`, influencer);
  }

  // Delete a brand by ID  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteInfluencer/${id}`);
  }
}
