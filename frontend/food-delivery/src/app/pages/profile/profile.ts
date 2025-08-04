import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

user:any;

constructor(private http: HttpClient, private keycloak:KeycloakService) {
  console.log('KeycloakService:', this.keycloak);
 }

async ngOnInit() {
  try {
    const isLoggedIn = await this.keycloak.isLoggedIn();
    if (!isLoggedIn) {
      console.error('User is not logged in.');
    //  await this.keycloak.login();
    this.user = null;
      return;
    }

    const token = await this.keycloak.getToken();
    if (!token) {
      console.error('No Keycloak token found.');
      this.user = null;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get('http://localhost:9000/api/user/me', { headers })
      .subscribe({
        next: data => {
          console.log('API response:', data);
          this.user = data;
        },
        error: err => {
          console.error('API error:', err);
          this.user = null;
        }
      });
  } catch (err) {
    console.error('Keycloak error:', err);
    this.user = null;
  }
}

logout() {
  this.keycloak.logout(window.location.origin);
}
}


