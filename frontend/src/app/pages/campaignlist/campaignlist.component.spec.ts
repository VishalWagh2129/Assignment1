import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignlistComponent } from './campaignlist.component';

describe('CampaignlistComponent', () => {
  let component: CampaignlistComponent;
  let fixture: ComponentFixture<CampaignlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampaignlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
