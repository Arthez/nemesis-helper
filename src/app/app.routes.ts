import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'start-game' },
    { path: 'start-game', loadChildren: () => import('./start-game/start-game.routes').then(module => module.startGameRoutes) },
    { path: 'game', loadChildren: () => import('./game/game.routes').then(module => module.gameRoutes) },
    { path: '**', redirectTo: '' },
];
