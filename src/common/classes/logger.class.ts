import { Signal, signal, WritableSignal } from '@angular/core';

export interface LogItem {
    dateIso: string;
    text: string;
    type: 'monster' | 'tracker' | 'event' | 'undefined';
    roundNum: string;
}

export class Logger {

    public readonly logs: Signal<LogItem[]>;
    private readonly logsSignal: WritableSignal<LogItem[]> = signal([]);
    private roundNumFn?: () => number | string;

    public constructor() {
        this.logs = this.logsSignal.asReadonly();
    }

    public init(logs: LogItem[], roundNumFn: () => number | string): void {
        this.logsSignal.set(logs);
        this.roundNumFn = roundNumFn;
    }

    public clear(): void {
        this.logsSignal.set([]);
    }

    public addRecord(text: string, type: LogItem['type']): void {
        const record: LogItem = { dateIso: (new Date()).toISOString(), text, type, roundNum: this.getRoundNum() };
        this.logsSignal.update(logs => [...logs, record]);
    }

    public getRoundNum(): string {
        return this.roundNumFn ? `${ this.roundNumFn() }` : '?';
    }

}
