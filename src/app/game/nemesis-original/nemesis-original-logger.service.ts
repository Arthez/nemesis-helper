import { Injectable, Signal } from '@angular/core';
import { Logger, LogItem } from '@common/classes/logger.class';
import { Autodestruction } from '@common/interfaces/autodestruction.interface';
import { MonsterDevelopmentResult } from '@common/interfaces/monster-development-result.interface';
import { MonsterTokenBase } from '@common/interfaces/monster-token-base.interface';

@Injectable()
export class NemesisOriginalLoggerService {

    public readonly logs: Signal<LogItem[]>;
    private readonly logger: Logger = new Logger();

    public constructor() {
        this.logs = this.logger.logs;
    }

    public init(logs: LogItem[], roundNumFn: () => number): void {
        this.logger.init(logs, roundNumFn);
    }

    public logMonsterDevelopment(developmentResult: MonsterDevelopmentResult<MonsterTokenBase>): void {
        this.logger.addRecord(
            `Monster development with ${ developmentResult.success ? 'success' : 'failure' } (${ developmentResult.token.id })`,
            'monster',
        );
    }

    public logMonsterEncounter(monster: MonsterTokenBase): void {
        this.logger.addRecord(`Monster encounter (${ monster.id })`, 'monster');
    }

    public logMonsterAdd(monster: MonsterTokenBase): void {
        this.logger.addRecord(`Monster add (${ monster.id })`, 'monster');
    }

    public logMonsterKill(monster: MonsterTokenBase): void {
        this.logger.addRecord(`Monster kill (${ monster.id })`, 'monster');
    }

    public logMonsterRetreat(monster: MonsterTokenBase): void {
        this.logger.addRecord(`Monster retreat (${ monster.id })`, 'monster');
    }

    public logAutodestructionStateChange(
        stateFrom: Autodestruction['state'] | undefined,
        stateTo: Autodestruction['state'] | undefined,
    ): void {
        this.logger.addRecord(
            `Autodestruction state change (${ stateFrom || 'inactive' } => ${ stateTo || 'inactive' })`,
            'tracker',
        );
    }

    public logRoundChange(nextRoundNum: number): void {
        this.logger.addRecord(`Round change (${this.logger.getRoundNum()} => ${nextRoundNum})`, 'event');
    }

    public logSaveGameState(): void {
        this.logger.addRecord('GAME SAVED!', 'event');
    }

    public logAutodestructionStateInevitable(): void {
        this.logger.addRecord('Autodestruction state change to INEVITABLE!', 'event');
    }

}
