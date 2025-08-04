import { Component } from '@angular/core';
import { AuthGuard } from '../../auth-gaurd';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {

  constructor(private keycloak: KeycloakService) {}

  // login() {
  //   this.keycloak.login({ redirectUri: window.location.origin + '/profile' });
  // }

  login() {
  window.location.href = 'http://localhost:8180/realms/food-delivery/protocol/openid-connect/auth' +
    '?client_id=food-client' +
    '&redirect_uri=http://localhost:4200/welcome' +
    '&response_type=code' +
    '&scope=openid';
}



}
