import {  Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, Router, RouterStateSnapshot } from "@angular/router";
import { KeycloakService } from "keycloak-angular";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private keycloakService: KeycloakService, private router: Router){} 


   async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const isLoggedIn = await this.keycloakService.isLoggedIn();

        if(!isLoggedIn) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}