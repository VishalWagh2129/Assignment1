import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Campaign {
  id?: number;
  brand:string;
  name:string;
  influencers:Array<string>;
  status: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CampaignService {


  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Save a new brand
  save(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(`${this.baseUrl}/saveCampaign`, campaign);
  }

  // Get all brands
  getAll(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${this.baseUrl}/getAllCampaigns`);
  }

  // Get a brand by ID
  getById(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.baseUrl}/getCampaignbyId/${id}`);
  }

  // Update an existing brand
  update(id: number, campaign: Campaign): Observable<Campaign> {
    return this.http.put<Campaign>(`${this.baseUrl}/updateCampaign/${id}`, campaign);
  }

  // Delete a brand by ID  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteCampaign/${id}`);
  }

  getAllBrands(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${this.baseUrl}/getBrands`);
  }

  getAllInfluencers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getInfluencers`);
  }
}
