import { Routes } from '@angular/router';
import { AdminPanelComponent } from '../components/admin-panel/admin-panel.component';
import { AdminAddMovieComponent } from '../components/admin-panel/admin-add-movie/admin-add-movie.component';
import { AdminEditMovieComponent } from '../components/admin-panel/admin-edit-movie/admin-edit-movie.component';
import { AdminAddScreeningComponent } from '../components/admin-panel/admin-add-screening/admin-add-screening.component';
import { AdminDeleteScreeningComponent } from '../components/admin-panel/admin-delete-screening/admin-delete-screening.component';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      { path: 'add', component: AdminAddMovieComponent },
      { path: 'edit', component: AdminEditMovieComponent },
      { path: 'add-screening', component: AdminAddScreeningComponent },
      { path: 'delete-screening', component: AdminDeleteScreeningComponent },
      { path: '', redirectTo: 'admin/add', pathMatch: 'full' },
      { path: '**', redirectTo: 'admin/add', pathMatch: 'full' },
    ],
  },
];
