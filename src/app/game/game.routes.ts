import { Routes } from '@angular/router';
import { gameConfigs } from '@configs/games.config';
import { GameComponent } from './game.component';
import { gameGuard } from './game.guard';

export const gameRoutes: Routes = [
    {
        path: '',
        component: GameComponent,
        canActivateChild: [gameGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: gameConfigs.nemesisLockdown.path,
            },
            {
                path: gameConfigs.nemesisOriginal.path,
                loadComponent: () => import('./nemesis-original/nemesis-original.component')
                    .then(component => component.NemesisOriginalComponent),
            },
            {
                path: gameConfigs.nemesisLockdown.path,
                loadComponent: () => import('./nemesis-lockdown/nemesis-lockdown.component')
                    .then(component => component.NemesisLockdownComponent),
            },
            {
                path: gameConfigs.nemesisRetaliation.path,
                loadComponent: () => import('./nemesis-retaliation/nemesis-retaliation.component')
                    .then(component => component.NemesisRetaliationComponent),
            },
        ],
    },
];
