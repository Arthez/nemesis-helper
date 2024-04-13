import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageManager } from '@common/utils/storage-manager.util';
import { GameConfig, gameConfigs } from '@configs/games.config';

export const gameGuard: CanActivateFn = route => {
    const router: Router = inject(Router);
    const gameConfig: GameConfig | undefined = Object.values(gameConfigs)
        .find((config: GameConfig) => config.path === route.url[0].path);
    if (!gameConfig) {
        return router.createUrlTree(['/']);
    }
    return StorageManager.loadGameSetupData(gameConfig.id) ? true : router.createUrlTree(['/']);
};
