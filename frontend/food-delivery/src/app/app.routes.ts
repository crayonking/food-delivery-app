import { Routes } from '@angular/router';
import { Profile } from './pages/profile/profile';
import { Home } from './home/home';

export const routes: Routes = [
     { path: 'profile', component: Profile },
  // other routes like home, menu, etc.
  { path: '', component: Home }
];
