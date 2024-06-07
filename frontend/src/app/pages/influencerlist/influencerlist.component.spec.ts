import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerlistComponent } from './influencerlist.component';

describe('BrandlistComponent', () => {
  let component: InfluencerlistComponent;
  let fixture: ComponentFixture<InfluencerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfluencerlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfluencerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
