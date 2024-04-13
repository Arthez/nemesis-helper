import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { StorageManager } from '@common/utils/storage-manager.util';
import { GameSetupData } from '@configs/games.config';
import { gameGuard } from './game.guard';

describe('gameGuard', () => {

    let routerMock: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({});

        routerMock = TestBed.inject(Router);
    });

    it('should call createUrlTree with proper param when url path is not found', () => {
        const createUrlTreeSpy: jasmine.Spy = spyOn(routerMock, 'createUrlTree');

        TestBed.runInInjectionContext(() => gameGuard(
            { url: [{ path: 'somePath' }] } as unknown as ActivatedRouteSnapshot,
            { url: 'someUrl2' } as unknown as RouterStateSnapshot,
        ));

        expect(createUrlTreeSpy).toHaveBeenCalledWith(['/']);
    });

    it('should return proper value when url path is not found', () => {
        spyOn(routerMock, 'createUrlTree').and.returnValue('/urlTree' as unknown as UrlTree);

        const result: string = TestBed.runInInjectionContext(() => gameGuard(
            { url: [{ path: 'somePath' }] } as unknown as ActivatedRouteSnapshot,
            { url: 'someUrl2' } as unknown as RouterStateSnapshot,
        )) as unknown as string;

        expect(result).toEqual('/urlTree');
    });

    it('should behave properly when url path is found and gameSetupData exist', () => {
        const createUrlTreeSpy: jasmine.Spy = spyOn(routerMock, 'createUrlTree').and.returnValue('/urlTree' as unknown as UrlTree);
        const loadGameSetupDataSpy: jasmine.Spy = spyOn(StorageManager, 'loadGameSetupData').and.returnValue({} as GameSetupData);

        const result: MaybeAsync<GuardResult> = TestBed.runInInjectionContext(() => gameGuard(
            { url: [{ path: 'nemesis-lockdown' }] } as unknown as ActivatedRouteSnapshot,
            { url: 'someUrl2' } as unknown as RouterStateSnapshot,
        ));

        expect(createUrlTreeSpy).not.toHaveBeenCalled();
        expect(loadGameSetupDataSpy).toHaveBeenCalledWith('nemesisLockdown');
        expect(result).toEqual(true);
    });

    it('should behave properly when url path is found and gameSetupData do NOT exist', () => {
        const createUrlTreeSpy: jasmine.Spy = spyOn(routerMock, 'createUrlTree').and.returnValue('/urlTree' as unknown as UrlTree);
        const loadGameSetupDataSpy: jasmine.Spy = spyOn(StorageManager, 'loadGameSetupData').and.returnValue(undefined);

        const result: string = TestBed.runInInjectionContext(() => gameGuard(
            { url: [{ path: 'nemesis-lockdown' }] } as unknown as ActivatedRouteSnapshot,
            { url: 'someUrl2' } as unknown as RouterStateSnapshot,
        )) as unknown as string;

        expect(createUrlTreeSpy).toHaveBeenCalledWith(['/']);
        expect(loadGameSetupDataSpy).toHaveBeenCalledWith('nemesisLockdown');
        expect(result).toEqual('/urlTree');
    });

});
