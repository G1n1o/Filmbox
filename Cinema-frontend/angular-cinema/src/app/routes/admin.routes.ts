import { Router, Routes } from '@angular/router';
import { AdminPanelComponent } from '../components/admin-panel/admin-panel.component';
import { AdminAddMovieComponent } from '../components/admin-panel/admin-add-movie/admin-add-movie.component';
import { AdminEditMovieComponent } from '../components/admin-panel/admin-edit-movie/admin-edit-movie.component';
import { AdminAddScreeningComponent } from '../components/admin-panel/admin-add-screening/admin-add-screening.component';
import { AdminEditScreeningComponent } from '../components/admin-panel/admin-edit-screening/admin-edit-screening.component';
import { adminAuthGuard } from '../guards/admin-auth-guard';




export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [adminAuthGuard],
    children: [
      { path: 'add', component: AdminAddMovieComponent },
      { path: 'edit', component: AdminEditMovieComponent },
      { path: 'add-screening', component: AdminAddScreeningComponent },
      { path: 'edit-screening', component: AdminEditScreeningComponent },
      { path: '', redirectTo: 'add', pathMatch: 'full' },
      { path: '**', redirectTo: 'add', pathMatch: 'full' },
    ],
  },
];
