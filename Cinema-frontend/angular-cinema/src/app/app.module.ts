import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { ScheduledScreeningsComponent } from './components/scheduled-screenings/scheduled-screenings.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';

const routes: Routes = [
  { path: 'screenings/:id/reservation', component: SeatSelectionComponent },
  { path: 'screenings', component: ScheduledScreeningsComponent },
  { path: 'movies/:id', component:MovieDetailsComponent},
  { path: 'search/:keyword', component:MovieListComponent},
  { path: 'movies', component: MovieListComponent },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: '**', redirectTo: '/movies', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, MovieListComponent, NavbarComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FooterComponent,
    SearchComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
