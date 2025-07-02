import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  ticketPrice: number = 0;

  constructor(private settingService: SettingService) {}

  ngOnInit(): void {
    this.settingService.getTicketPrice().subscribe((price) => {
      this.ticketPrice = price;
    });
  }

  saveTicketPrice() {
    this.settingService.setTicketPrice(this.ticketPrice).subscribe(() => {
      console.log(this.ticketPrice);
    });
  }
}
