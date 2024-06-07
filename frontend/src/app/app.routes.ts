import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { BrandlistComponent } from './pages/brandlist/brandlist.component';
import { AuthGuardService } from './services/auth-guard.service';
import { InfluencerlistComponent } from './pages/influencerlist/influencerlist.component';
import { CampaignlistComponent } from './pages/campaignlist/campaignlist.component';
import { AddBrandComponent } from './pages/brandlist/add-brand/add-brand.component';
import { AddInfluencerComponent } from './pages/influencerlist/add-influencer/add-influencer.component';
import { AddCampaignComponent } from './pages/campaignlist/add-campaign/add-campaign.component';

export const routes: Routes = [
    { path:'',redirectTo:'login',pathMatch:'full'},
    { path:'login', component:LoginComponent},
    { path:'signup', component:SignupComponent},
    {
        path: 'dashboard',
        component: LayoutComponent,
        canActivate: [AuthGuardService],
        children: [
            { path:'brand', component:BrandlistComponent},
            { path:'brand/add', component:AddBrandComponent},
            { path:'influencer', component:InfluencerlistComponent},
            { path:'influencer/add', component:AddInfluencerComponent},
            { path:'campaign', component:CampaignlistComponent},
            { path:'campaign/add', component:AddCampaignComponent},
        ]
    },
];
