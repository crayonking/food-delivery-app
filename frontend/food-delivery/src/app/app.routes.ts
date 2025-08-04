import { Routes } from '@angular/router';
import { Profile } from './pages/profile/profile';
import { Home } from './home/home';
import { AuthGuard } from './auth-gaurd';
import { Auth } from './pages/auth/auth';
import { Welcome } from './pages/welcome/welcome';

export const routes: Routes = [
  { path: 'profile', component: Profile , canActivate: [AuthGuard] },

  { path: '', component: Home },
  {path:'auth', component:Auth},
  {path:'welcome', component:Welcome}

];
