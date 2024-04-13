import { InjectionToken } from '@angular/core';
import { GameKey } from '@configs/games.config';

export const GAME_ID: InjectionToken<GameKey> = new InjectionToken<GameKey>('GameIdToken');
