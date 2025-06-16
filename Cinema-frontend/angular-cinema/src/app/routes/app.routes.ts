import { Routes } from '@angular/router';
import { AdminPanelComponent } from '../components/admin-panel/admin-panel.component';
import { SummaryComponent } from '../components/summary/summary.component';
import { ReservationFormComponent } from '../components/reservation-form/reservation-form.component';
import { SeatSelectionComponent } from '../components/seat-selection/seat-selection.component';
import { ScheduledScreeningsComponent } from '../components/scheduled-screenings/scheduled-screenings.component';
import { MovieDetailsComponent } from '../components/movie-details/movie-details.component';
import { MovieListComponent } from '../components/movie-list/movie-list.component';
import { adminRoutes} from './admin.routes';

export const routes: Routes = [
  { path: 'admin', component: AdminPanelComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'reservation', component: ReservationFormComponent },
  { path: 'screenings/:id/reservation', component: SeatSelectionComponent },
  { path: 'screenings', component: ScheduledScreeningsComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'search/:keyword', component: MovieListComponent },
  { path: 'movies', component: MovieListComponent },
    ...adminRoutes,
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: '**', redirectTo: '/movies', pathMatch: 'full' },

];
