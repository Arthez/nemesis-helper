import { MonsterType } from '@common/enums/monster-types.enum';
import { MonsterDevelopmentResult } from '@common/interfaces/monster-development-result.interface';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';
import { MonsterTokensService } from './monster-tokens.service';

describe('MonsterTokensService', () => {
    let service: MonsterTokensService<MonsterTokenBase>;
    const defaultMonsterBagConfigMock: Record<MonsterType, number> = Object.freeze({
        Q: 1,
        B: 0,
        A: 3,
        C: 1,
        L: 4,
        BLANK: 1,
    });
    const availableMonstersMock: MonsterTokenBase[] = [
        { id: 'Q1', type: MonsterType.QUEEN },
        { id: 'B1', type: MonsterType.BREEDER },
        { id: 'B2', type: MonsterType.BREEDER },
        { id: 'A1', type: MonsterType.ADULT },
        { id: 'A2', type: MonsterType.ADULT },
        { id: 'A3', type: MonsterType.ADULT },
        { id: 'A4', type: MonsterType.ADULT },
        { id: 'A5', type: MonsterType.ADULT },
        { id: 'A6', type: MonsterType.ADULT },
        { id: 'A7', type: MonsterType.ADULT },
        { id: 'A8', type: MonsterType.ADULT },
        { id: 'A9', type: MonsterType.ADULT },
        { id: 'A10', type: MonsterType.ADULT },
        { id: 'A11', type: MonsterType.ADULT },
        { id: 'A12', type: MonsterType.ADULT },
        { id: 'C1', type: MonsterType.CREEPER },
        { id: 'C2', type: MonsterType.CREEPER },
        { id: 'C3', type: MonsterType.CREEPER },
        { id: 'L1', type: MonsterType.LARVA },
        { id: 'L2', type: MonsterType.LARVA },
        { id: 'L3', type: MonsterType.LARVA },
        { id: 'L4', type: MonsterType.LARVA },
        { id: 'L5', type: MonsterType.LARVA },
        { id: 'L6', type: MonsterType.LARVA },
        { id: 'L7', type: MonsterType.LARVA },
        { id: 'L8', type: MonsterType.LARVA },
        { id: 'BLANK1', type: MonsterType.BLANK },
    ];

    beforeEach(() => {
        service = new MonsterTokensService<MonsterTokenBase>();
    });

    describe('constructor', () => {
        it('should be created with proper monsters data', () => {
            expect(service.availableMonsters()).toEqual([]);
            expect(service.bagMonsters()).toEqual([]);
            expect(service.activeMonsters()).toEqual([]);
        });
    });

    describe('initMonsters', () => {
        it('should be initialized with proper monster data for 4 players', () => {
            service.initMonsters(defaultMonsterBagConfigMock, [...availableMonstersMock], 4);

            const availableMonstersQueenCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.QUEEN).length;
            const availableMonstersBreederCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.BREEDER).length;
            const availableMonstersAdultCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.ADULT).length;
            const availableMonstersCreeperCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.CREEPER).length;
            const availableMonstersLarvaCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.LARVA).length;
            const availableMonstersBlankCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.BLANK).length;

            expect(availableMonstersQueenCount).toEqual(0);
            expect(availableMonstersBreederCount).toEqual(2);
            expect(availableMonstersAdultCount).toEqual(5);
            expect(availableMonstersCreeperCount).toEqual(2);
            expect(availableMonstersLarvaCount).toEqual(4);
            expect(availableMonstersBlankCount).toEqual(0);

            const bagMonstersQueenCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.QUEEN).length;
            const bagMonstersBreederCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.BREEDER).length;
            const bagMonstersAdultCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.ADULT).length;
            const bagMonstersCreeperCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.CREEPER).length;
            const bagMonstersLarvaCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.LARVA).length;
            const bagMonstersBlankCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.BLANK).length;

            expect(bagMonstersQueenCount).toEqual(1);
            expect(bagMonstersBreederCount).toEqual(0);
            expect(bagMonstersAdultCount).toEqual(7);
            expect(bagMonstersCreeperCount).toEqual(1);
            expect(bagMonstersLarvaCount).toEqual(4);
            expect(bagMonstersBlankCount).toEqual(1);

            expect(service.activeMonsters()).toEqual([]);
        });

        it('should be initialized with proper monster data for 1 player', () => {
            service.initMonsters(defaultMonsterBagConfigMock, [...availableMonstersMock], 1);

            const availableMonstersQueenCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.QUEEN).length;
            const availableMonstersBreederCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.BREEDER).length;
            const availableMonstersAdultCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.ADULT).length;
            const availableMonstersCreeperCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.CREEPER).length;
            const availableMonstersLarvaCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.LARVA).length;
            const availableMonstersBlankCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.BLANK).length;

            expect(availableMonstersQueenCount).toEqual(0);
            expect(availableMonstersBreederCount).toEqual(2);
            expect(availableMonstersAdultCount).toEqual(8);
            expect(availableMonstersCreeperCount).toEqual(2);
            expect(availableMonstersLarvaCount).toEqual(4);
            expect(availableMonstersBlankCount).toEqual(0);

            const bagMonstersQueenCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.QUEEN).length;
            const bagMonstersBreederCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.BREEDER).length;
            const bagMonstersAdultCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.ADULT).length;
            const bagMonstersCreeperCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.CREEPER).length;
            const bagMonstersLarvaCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.LARVA).length;
            const bagMonstersBlankCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.BLANK).length;

            expect(bagMonstersQueenCount).toEqual(1);
            expect(bagMonstersBreederCount).toEqual(0);
            expect(bagMonstersAdultCount).toEqual(4);
            expect(bagMonstersCreeperCount).toEqual(1);
            expect(bagMonstersLarvaCount).toEqual(4);
            expect(bagMonstersBlankCount).toEqual(1);

            expect(service.activeMonsters()).toEqual([]);
        });

        it('should be initialized with proper monster data for 20 players', () => {
            service.initMonsters(defaultMonsterBagConfigMock, [...availableMonstersMock], 20);

            const availableMonstersQueenCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.QUEEN).length;
            const availableMonstersBreederCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.BREEDER).length;
            const availableMonstersAdultCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.ADULT).length;
            const availableMonstersCreeperCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.CREEPER).length;
            const availableMonstersLarvaCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.LARVA).length;
            const availableMonstersBlankCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.BLANK).length;

            expect(availableMonstersQueenCount).toEqual(0);
            expect(availableMonstersBreederCount).toEqual(2);
            expect(availableMonstersAdultCount).toEqual(0);
            expect(availableMonstersCreeperCount).toEqual(2);
            expect(availableMonstersLarvaCount).toEqual(4);
            expect(availableMonstersBlankCount).toEqual(0);

            const bagMonstersQueenCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.QUEEN).length;
            const bagMonstersBreederCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.BREEDER).length;
            const bagMonstersAdultCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.ADULT).length;
            const bagMonstersCreeperCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.CREEPER).length;
            const bagMonstersLarvaCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.LARVA).length;
            const bagMonstersBlankCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.BLANK).length;

            expect(bagMonstersQueenCount).toEqual(1);
            expect(bagMonstersBreederCount).toEqual(0);
            expect(bagMonstersAdultCount).toEqual(12);
            expect(bagMonstersCreeperCount).toEqual(1);
            expect(bagMonstersLarvaCount).toEqual(4);
            expect(bagMonstersBlankCount).toEqual(1);

            expect(service.activeMonsters()).toEqual([]);
        });
    });

    describe('loadBags', () => {
        it('should set monster data properly when given empty arrays', () => {
            service.loadBags({
                availableMonsters: [],
                activeMonsters: [],
                bagMonsters: [],
            });

            expect(service.availableMonsters()).toEqual([]);
            expect(service.bagMonsters()).toEqual([]);
            expect(service.activeMonsters()).toEqual([]);
        });

        it('should set monster data properly when given populated arrays', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.ADULT, id: 'A1' },
                { type: MonsterType.ADULT, id: 'A2' },
                { type: MonsterType.ADULT, id: 'A3' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.LARVA, id: 'L1' },
                { type: MonsterType.LARVA, id: 'L2' },
                { type: MonsterType.LARVA, id: 'L3' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });

            expect(service.availableMonsters().every(
                monster => availableMonstersShortMock.find(initialMonster => monster.id === initialMonster.id),
            )).toEqual(true);
            expect(service.bagMonsters().every(
                monster => bagMonstersShortMock.find(initialMonster => monster.id === initialMonster.id),
            )).toEqual(true);
            expect(service.activeMonsters().every(
                monster => activeMonstersShortMock.find(initialMonster => monster.id === initialMonster.id),
            )).toEqual(true);
        });
    });

    describe('addMonsterToBag', () => {
        it('should set monster data properly by adding 10 adults and 5 breeders', () => {
            service.initMonsters(defaultMonsterBagConfigMock, [...availableMonstersMock], 4);
            service.addMonsterToBag(MonsterType.ADULT);
            service.addMonsterToBag(MonsterType.ADULT);
            service.addMonsterToBag(MonsterType.ADULT);
            service.addMonsterToBag(MonsterType.ADULT);
            service.addMonsterToBag(MonsterType.ADULT);
            service.addMonsterToBag(MonsterType.ADULT);
            service.addMonsterToBag(MonsterType.ADULT);
            service.addMonsterToBag(MonsterType.ADULT);
            service.addMonsterToBag(MonsterType.ADULT);
            service.addMonsterToBag(MonsterType.ADULT);
            service.addMonsterToBag(MonsterType.BREEDER);
            service.addMonsterToBag(MonsterType.BREEDER);
            service.addMonsterToBag(MonsterType.BREEDER);
            service.addMonsterToBag(MonsterType.BREEDER);
            service.addMonsterToBag(MonsterType.BREEDER);

            const availableMonstersQueenCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.QUEEN).length;
            const availableMonstersBreederCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.BREEDER).length;
            const availableMonstersAdultCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.ADULT).length;
            const availableMonstersCreeperCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.CREEPER).length;
            const availableMonstersLarvaCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.LARVA).length;
            const availableMonstersBlankCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.BLANK).length;

            expect(availableMonstersQueenCount).toEqual(0);
            expect(availableMonstersBreederCount).toEqual(0);
            expect(availableMonstersAdultCount).toEqual(0);
            expect(availableMonstersCreeperCount).toEqual(2);
            expect(availableMonstersLarvaCount).toEqual(4);
            expect(availableMonstersBlankCount).toEqual(0);

            const bagMonstersQueenCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.QUEEN).length;
            const bagMonstersBreederCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.BREEDER).length;
            const bagMonstersAdultCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.ADULT).length;
            const bagMonstersCreeperCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.CREEPER).length;
            const bagMonstersLarvaCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.LARVA).length;
            const bagMonstersBlankCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.BLANK).length;

            expect(bagMonstersQueenCount).toEqual(1);
            expect(bagMonstersBreederCount).toEqual(2);
            expect(bagMonstersAdultCount).toEqual(12);
            expect(bagMonstersCreeperCount).toEqual(1);
            expect(bagMonstersLarvaCount).toEqual(4);
            expect(bagMonstersBlankCount).toEqual(1);

            expect(service.activeMonsters()).toEqual([]);
        });

        it('should set monster data properly by adding 3 adults and 2 breeders', () => {
            service.initMonsters(defaultMonsterBagConfigMock, [...availableMonstersMock], 4);
            service.addMonsterToBag(MonsterType.ADULT);
            service.addMonsterToBag(MonsterType.ADULT);
            service.addMonsterToBag(MonsterType.ADULT);
            service.addMonsterToBag(MonsterType.BREEDER);
            service.addMonsterToBag(MonsterType.BREEDER);

            const availableMonstersQueenCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.QUEEN).length;
            const availableMonstersBreederCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.BREEDER).length;
            const availableMonstersAdultCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.ADULT).length;
            const availableMonstersCreeperCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.CREEPER).length;
            const availableMonstersLarvaCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.LARVA).length;
            const availableMonstersBlankCount: number = service.availableMonsters()
                .filter(monster => monster.type === MonsterType.BLANK).length;

            expect(availableMonstersQueenCount).toEqual(0);
            expect(availableMonstersBreederCount).toEqual(0);
            expect(availableMonstersAdultCount).toEqual(2);
            expect(availableMonstersCreeperCount).toEqual(2);
            expect(availableMonstersLarvaCount).toEqual(4);
            expect(availableMonstersBlankCount).toEqual(0);

            const bagMonstersQueenCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.QUEEN).length;
            const bagMonstersBreederCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.BREEDER).length;
            const bagMonstersAdultCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.ADULT).length;
            const bagMonstersCreeperCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.CREEPER).length;
            const bagMonstersLarvaCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.LARVA).length;
            const bagMonstersBlankCount: number = service.bagMonsters()
                .filter(monster => monster.type === MonsterType.BLANK).length;

            expect(bagMonstersQueenCount).toEqual(1);
            expect(bagMonstersBreederCount).toEqual(2);
            expect(bagMonstersAdultCount).toEqual(10);
            expect(bagMonstersCreeperCount).toEqual(1);
            expect(bagMonstersLarvaCount).toEqual(4);
            expect(bagMonstersBlankCount).toEqual(1);

            expect(service.activeMonsters()).toEqual([]);
        });
    });

    describe('getMonsterEncounterFromBag', () => {
        it('should NOT transfer anything when bag is empty', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.ADULT, id: 'A1' },
                { type: MonsterType.ADULT, id: 'A2' },
                { type: MonsterType.ADULT, id: 'A3' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            const monsterEncounter: MonsterTokenBase | undefined = service.getMonsterEncounterFromBag();

            expect(monsterEncounter).toEqual(undefined);

            expect(service.availableMonsters()
                .every(monster => ['A1', 'A2', 'A3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.availableMonsters().length).toEqual(3);
            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(3);

            expect(service.bagMonsters().length).toEqual(0);
        });

        it('should transfer A5 when to active', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.ADULT, id: 'A1' },
                { type: MonsterType.ADULT, id: 'A2' },
                { type: MonsterType.ADULT, id: 'A3' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.ADULT, id: 'A5' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            const monsterEncounter: MonsterTokenBase | undefined = service.getMonsterEncounterFromBag();

            expect(monsterEncounter).toEqual({ type: MonsterType.ADULT, id: 'A5' });

            expect(service.availableMonsters()
                .every(monster => ['A1', 'A2', 'A3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.availableMonsters().length).toEqual(3);
            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3', 'A5']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(4);

            expect(service.bagMonsters().length).toEqual(0);
        });

        it('should add A1 when encountered BLANK token and its only token in the bag', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.ADULT, id: 'A1' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.BLANK, id: 'BLANK1' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            const monsterEncounter: MonsterTokenBase | undefined = service.getMonsterEncounterFromBag();

            expect(monsterEncounter).toEqual({ type: MonsterType.BLANK, id: 'BLANK1' });

            expect(service.availableMonsters().length).toEqual(0);

            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(3);

            expect(service.bagMonsters()
                .every(monster => ['BLANK1', 'A1']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.bagMonsters().length).toEqual(2);
        });

        // This is impossible to test due to shuffle (but used it to test it once locally)
        xit('should do nothing when encountered BLANK token and its NOT only token in the bag', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.ADULT, id: 'A1' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.QUEEN, id: 'Q1' },
                { type: MonsterType.BLANK, id: 'BLANK1' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            const monsterEncounter: MonsterTokenBase | undefined = service.getMonsterEncounterFromBag();

            expect(monsterEncounter).toEqual({ type: MonsterType.BLANK, id: 'BLANK1' });

            expect(service.availableMonsters()
                .every(monster => ['A1']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.availableMonsters().length).toEqual(1);

            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(3);

            expect(service.bagMonsters()
                .every(monster => ['BLANK1', 'Q1']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.bagMonsters().length).toEqual(2);
        });

        it('should do nothing when encountered BLANK token and there is NO adults available', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.LARVA, id: 'L1' },
                { type: MonsterType.LARVA, id: 'L2' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.BLANK, id: 'BLANK1' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            const monsterEncounter: MonsterTokenBase | undefined = service.getMonsterEncounterFromBag();

            expect(monsterEncounter).toEqual({ type: MonsterType.BLANK, id: 'BLANK1' });

            expect(service.availableMonsters()
                .every(monster => ['L1', 'L2']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.availableMonsters().length).toEqual(2);

            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(3);

            expect(service.bagMonsters()
                .every(monster => ['BLANK1']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.bagMonsters().length).toEqual(1);
        });
    });

    describe('triggerMonsterDevelopment', () => {
        it('should transfer ADULT from available to bag when development is BLANK', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.ADULT, id: 'A1' },
                { type: MonsterType.ADULT, id: 'A2' },
                { type: MonsterType.ADULT, id: 'A3' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.BLANK, id: 'BLANK1' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            const monsterDevelopment: MonsterDevelopmentResult<MonsterTokenBase> = service.triggerMonsterDevelopment();

            expect(monsterDevelopment).toEqual({
                token: { type: MonsterType.BLANK, id: 'BLANK1' },
                success: true,
            });

            expect(service.availableMonsters().filter(monster => monster.type === MonsterType.ADULT).length).toEqual(2);
            expect(service.availableMonsters().length).toEqual(2);

            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(3);

            expect(service.bagMonsters().filter(monster => monster.type === MonsterType.ADULT).length).toEqual(1);
            expect(service.bagMonsters().filter(monster => monster.type === MonsterType.BLANK).length).toEqual(1);
            expect(service.bagMonsters().length).toEqual(2);
        });

        it('should do nothing when development is BLANK and there is no ADULT available', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.LARVA, id: 'L2' },
                { type: MonsterType.LARVA, id: 'L3' },
                { type: MonsterType.LARVA, id: 'L4' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.BLANK, id: 'BLANK1' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            const monsterDevelopment: MonsterDevelopmentResult<MonsterTokenBase> = service.triggerMonsterDevelopment();

            expect(monsterDevelopment).toEqual({
                token: { type: MonsterType.BLANK, id: 'BLANK1' },
                success: false,
            });

            expect(service.availableMonsters().filter(monster => monster.type === MonsterType.LARVA).length).toEqual(3);
            expect(service.availableMonsters().length).toEqual(3);
            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(3);

            expect(service.bagMonsters()
                .every(monster => monster.type === MonsterType.BLANK)).toEqual(true);
            expect(service.bagMonsters().length).toEqual(1);
        });


        it('should transfer ADULT from available to bag and transfer LARVA to available when development is LARVA', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.ADULT, id: 'A1' },
                { type: MonsterType.ADULT, id: 'A2' },
                { type: MonsterType.ADULT, id: 'A3' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.LARVA, id: 'L1' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            const monsterDevelopment: MonsterDevelopmentResult<MonsterTokenBase> = service.triggerMonsterDevelopment();

            expect(monsterDevelopment).toEqual({
                token: { type: MonsterType.LARVA, id: 'L1' },
                success: true,
            });

            expect(service.availableMonsters().filter(monster => monster.type === MonsterType.ADULT).length).toEqual(2);
            expect(service.availableMonsters().filter(monster => monster.type === MonsterType.LARVA).length).toEqual(1);
            expect(service.availableMonsters().length).toEqual(3);
            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(3);

            expect(service.bagMonsters()
                .every(monster => monster.type === MonsterType.ADULT)).toEqual(true);
            expect(service.bagMonsters().length).toEqual(1);
        });

        it('should do nothing when development is LARVA and there is no ADULT available', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.LARVA, id: 'L2' },
                { type: MonsterType.LARVA, id: 'L3' },
                { type: MonsterType.LARVA, id: 'L4' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.LARVA, id: 'L1' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            const monsterDevelopment: MonsterDevelopmentResult<MonsterTokenBase> = service.triggerMonsterDevelopment();

            expect(monsterDevelopment).toEqual({
                token: { type: MonsterType.LARVA, id: 'L1' },
                success: false,
            });

            expect(service.availableMonsters().filter(monster => monster.type === MonsterType.ADULT).length).toEqual(0);
            expect(service.availableMonsters().filter(monster => monster.type === MonsterType.LARVA).length).toEqual(3);
            expect(service.availableMonsters().length).toEqual(3);
            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(3);

            expect(service.bagMonsters()
                .every(monster => monster.type === MonsterType.LARVA)).toEqual(true);
            expect(service.bagMonsters().length).toEqual(1);
        });


        it('should transfer BREEDER from available to bag and transfer CREEPER to available when development is CREEPER', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.BREEDER, id: 'B1' },
                { type: MonsterType.BREEDER, id: 'B2' },
                { type: MonsterType.BREEDER, id: 'B3' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C4' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            const monsterDevelopment: MonsterDevelopmentResult<MonsterTokenBase> = service.triggerMonsterDevelopment();

            expect(monsterDevelopment).toEqual({
                token: { type: MonsterType.CREEPER, id: 'C4' },
                success: true,
            });

            expect(service.availableMonsters().filter(monster => monster.type === MonsterType.BREEDER).length).toEqual(2);
            expect(service.availableMonsters().filter(monster => monster.type === MonsterType.CREEPER).length).toEqual(1);
            expect(service.availableMonsters().length).toEqual(3);
            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(3);

            expect(service.bagMonsters()
                .every(monster => monster.type === MonsterType.BREEDER)).toEqual(true);
            expect(service.bagMonsters().length).toEqual(1);
        });

        it('should do nothing when development is CREEPER and there is no BREEDER available', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.LARVA, id: 'L2' },
                { type: MonsterType.LARVA, id: 'L3' },
                { type: MonsterType.LARVA, id: 'L4' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C4' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            const monsterDevelopment: MonsterDevelopmentResult<MonsterTokenBase> = service.triggerMonsterDevelopment();

            expect(monsterDevelopment).toEqual({
                token: { type: MonsterType.CREEPER, id: 'C4' },
                success: false,
            });

            expect(service.availableMonsters().filter(monster => monster.type === MonsterType.BREEDER).length).toEqual(0);
            expect(service.availableMonsters().filter(monster => monster.type === MonsterType.LARVA).length).toEqual(3);
            expect(service.availableMonsters().length).toEqual(3);
            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(3);

            expect(service.bagMonsters()
                .every(monster => monster.type === MonsterType.CREEPER)).toEqual(true);
            expect(service.bagMonsters().length).toEqual(1);
        });


        it('should do nothing when development is BREEDER', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.BREEDER, id: 'B1' },
                { type: MonsterType.BREEDER, id: 'B2' },
                { type: MonsterType.ADULT, id: 'A1' },
                { type: MonsterType.ADULT, id: 'A2' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.BREEDER, id: 'B4' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            const monsterDevelopment: MonsterDevelopmentResult<MonsterTokenBase> = service.triggerMonsterDevelopment();

            expect(monsterDevelopment).toEqual({
                token: { type: MonsterType.BREEDER, id: 'B4' },
                success: true,
            });

            expect(service.availableMonsters().filter(monster => monster.type === MonsterType.BREEDER).length).toEqual(2);
            expect(service.availableMonsters().filter(monster => monster.type === MonsterType.ADULT).length).toEqual(2);
            expect(service.availableMonsters().length).toEqual(4);
            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(3);

            expect(service.bagMonsters()
                .every(monster => monster.type === MonsterType.BREEDER)).toEqual(true);
            expect(service.bagMonsters().length).toEqual(1);
        });


        it('should do nothing when development is QUEEN', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.BREEDER, id: 'B1' },
                { type: MonsterType.BREEDER, id: 'B2' },
                { type: MonsterType.ADULT, id: 'A1' },
                { type: MonsterType.ADULT, id: 'A2' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.QUEEN, id: 'Q1' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            const monsterDevelopment: MonsterDevelopmentResult<MonsterTokenBase> = service.triggerMonsterDevelopment();

            expect(monsterDevelopment).toEqual({
                token: { type: MonsterType.QUEEN, id: 'Q1' },
                success: true,
            });

            expect(service.availableMonsters().filter(monster => monster.type === MonsterType.BREEDER).length).toEqual(2);
            expect(service.availableMonsters().filter(monster => monster.type === MonsterType.ADULT).length).toEqual(2);
            expect(service.availableMonsters().length).toEqual(4);
            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(3);

            expect(service.bagMonsters()
                .every(monster => monster.type === MonsterType.QUEEN)).toEqual(true);
            expect(service.bagMonsters().length).toEqual(1);
        });
    });

    describe('killMonster', () => {
        it('should transfer C2 token from active to available', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.ADULT, id: 'A1' },
                { type: MonsterType.ADULT, id: 'A2' },
                { type: MonsterType.ADULT, id: 'A3' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.LARVA, id: 'L1' },
                { type: MonsterType.LARVA, id: 'L2' },
                { type: MonsterType.QUEEN, id: 'Q1' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            service.killMonster('C2');

            expect(service.availableMonsters()
                .every(monster => ['A1', 'A2', 'A3', 'C2']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.availableMonsters().length).toEqual(4);
            expect(service.activeMonsters()
                .every(monster => ['C1', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(2);

            expect(service.bagMonsters()
                .every(monster => ['L1', 'L2', 'Q1']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.bagMonsters().length).toEqual(3);
        });

        it('should NOT transfer Q1 token when Q1 is NOT in active pool', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.ADULT, id: 'A1' },
                { type: MonsterType.ADULT, id: 'A2' },
                { type: MonsterType.QUEEN, id: 'Q1' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.LARVA, id: 'L1' },
                { type: MonsterType.LARVA, id: 'L2' },
                { type: MonsterType.LARVA, id: 'L3' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            service.killMonster('Q1');

            expect(service.availableMonsters()
                .every(monster => ['A1', 'A2', 'Q1']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.availableMonsters().length).toEqual(3);
            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(3);

            expect(service.bagMonsters()
                .every(monster => ['L1', 'L2', 'L3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.bagMonsters().length).toEqual(3);
        });
    });

    describe('putMonsterBackToBag', () => {
        it('should transfer C2 token from active to bag', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.ADULT, id: 'A1' },
                { type: MonsterType.ADULT, id: 'A2' },
                { type: MonsterType.ADULT, id: 'A3' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.LARVA, id: 'L1' },
                { type: MonsterType.LARVA, id: 'L2' },
                { type: MonsterType.QUEEN, id: 'Q1' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            service.putMonsterBackToBag('C2');

            expect(service.availableMonsters()
                .every(monster => ['A1', 'A2', 'A3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.availableMonsters().length).toEqual(3);
            expect(service.activeMonsters()
                .every(monster => ['C1', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(2);

            expect(service.bagMonsters()
                .every(monster => ['L1', 'L2', 'Q1', 'C2']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.bagMonsters().length).toEqual(4);
        });

        it('should NOT transfer Q1 token when Q1 is NOT in active pool', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.ADULT, id: 'A1' },
                { type: MonsterType.ADULT, id: 'A2' },
                { type: MonsterType.QUEEN, id: 'Q1' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.LARVA, id: 'L1' },
                { type: MonsterType.LARVA, id: 'L2' },
                { type: MonsterType.LARVA, id: 'L3' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            service.putMonsterBackToBag('Q1');

            expect(service.availableMonsters()
                .every(monster => ['A1', 'A2', 'Q1']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.availableMonsters().length).toEqual(3);
            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(3);

            expect(service.bagMonsters()
                .every(monster => ['L1', 'L2', 'L3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.bagMonsters().length).toEqual(3);
        });
    });

    describe('summonQueenInNest', () => {
        it('should transfer Queen properly when Queen is available', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.ADULT, id: 'A1' },
                { type: MonsterType.ADULT, id: 'A2' },
                { type: MonsterType.ADULT, id: 'A3' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.LARVA, id: 'L1' },
                { type: MonsterType.LARVA, id: 'L2' },
                { type: MonsterType.QUEEN, id: 'Q1' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            service.summonQueenInNest();

            expect(service.availableMonsters()
                .every(monster => ['A1', 'A2', 'A3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.availableMonsters().length).toEqual(3);
            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3', 'Q1']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(4);

            expect(service.bagMonsters()
                .every(monster => ['L1', 'L2']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.bagMonsters().length).toEqual(2);
        });

        it('should transfer Queen properly when Queen is NOT available', () => {
            const availableMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.ADULT, id: 'A1' },
                { type: MonsterType.ADULT, id: 'A2' },
                { type: MonsterType.QUEEN, id: 'Q1' },
            ];
            const activeMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.CREEPER, id: 'C1' },
                { type: MonsterType.CREEPER, id: 'C2' },
                { type: MonsterType.CREEPER, id: 'C3' },
            ];
            const bagMonstersShortMock: MonsterTokenBase[] = [
                { type: MonsterType.LARVA, id: 'L1' },
                { type: MonsterType.LARVA, id: 'L2' },
                { type: MonsterType.LARVA, id: 'L3' },
            ];

            service.loadBags({
                availableMonsters: availableMonstersShortMock,
                activeMonsters: activeMonstersShortMock,
                bagMonsters: bagMonstersShortMock,
            });
            service.summonQueenInNest();

            expect(service.availableMonsters()
                .every(monster => ['A1', 'A2', 'Q1']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.availableMonsters().length).toEqual(3);
            expect(service.activeMonsters()
                .every(monster => ['C1', 'C2', 'C3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.activeMonsters().length).toEqual(3);

            expect(service.bagMonsters()
                .every(monster => ['L1', 'L2', 'L3']
                    .find(id => id === monster.id))).toEqual(true);
            expect(service.bagMonsters().length).toEqual(3);
        });
    });
});
