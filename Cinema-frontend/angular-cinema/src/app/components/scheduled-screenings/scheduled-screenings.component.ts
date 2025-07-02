import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Screening } from 'src/app/common/screening';
import { ScreeningService } from 'src/app/services/screening.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-scheduled-screenings',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './scheduled-screenings.component.html',
  styleUrls: ['./scheduled-screenings.component.css'],
})
export class ScheduledScreeningsComponent implements OnInit {
  screenings: Screening[] = [];
  groupedScreenings: { [date: string]: Screening[] } = {};
  sortedDates: string[] = [];

   isLoading: boolean = true;

  constructor(
    private screeningService: ScreeningService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.screeningService.getAllScreenings().subscribe((data) => {
      this.screenings = data;

      this.groupedScreenings = this.groupByDate(this.screenings);
      this.sortedDates = Object.keys(this.groupedScreenings).sort();
      this.isLoading = false;
    });
  }
    getPosterFullUrl(posterUrl: string) {
      return environment.filmboxImage + posterUrl;
    }

  groupByDate(screenings: Screening[]): { [date: string]: Screening[] } {
    const result: { [date: string]: Screening[] } = {};
    for (const s of screenings) {
      const date = new Date(s.screeningTime).toISOString().split('T')[0];
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(s);
    }
    return result;
  }

  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    const dayName = date
      .toLocaleDateString('pl-PL', { weekday: 'long' })
      .toUpperCase();
    const day = date.getDate();
    const month = date.toLocaleDateString('pl-PL', { month: 'long' });
    const year = date.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
  }

  onReserve(screeningId: number) {
    this.router.navigate(['/screenings', screeningId, 'reservation']);
  }
}
