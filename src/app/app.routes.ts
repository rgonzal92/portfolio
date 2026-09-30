import { Routes } from '@angular/router';
import { PROFILE } from './core/content';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: '', component: Home, title: `${PROFILE.name} · ${PROFILE.title}` },
  {
    path: 'resume',
    loadComponent: () => import('./features/resume/resume').then((m) => m.Resume),
    title: `Resume · ${PROFILE.name}`,
  },
  { path: '**', redirectTo: '' },
];
