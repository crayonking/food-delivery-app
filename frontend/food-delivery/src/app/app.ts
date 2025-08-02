import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Profile } from "./pages/profile/profile";
import { Home } from "./home/home";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(private router: Router) {}
  protected title = 'food-delivery';

   get isHomeActive(): boolean {
    return this.router.url === '/';
  }

  get isProfileActive(): boolean {
    return this.router.url.startsWith('/profile');
  }
}
