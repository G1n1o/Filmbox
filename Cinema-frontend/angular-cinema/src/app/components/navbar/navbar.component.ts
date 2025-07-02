import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginStatusComponent } from '../login-status/login-status.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,SearchComponent, RouterModule, LoginStatusComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
}