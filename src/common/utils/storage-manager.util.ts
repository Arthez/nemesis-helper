import { LogItem } from '@common/classes/logger.class';
import { AppConfig } from '@common/interfaces/app-config.interface';
import { GameKey, GameSetupData } from '@configs/games.config';

const setupDataKeySuffix: string = '_setup_data';
const saveDataKeySuffix: string = '_state_data';
const logsDataKeySuffix: string = '_logs_data';

export class StorageManager {

    public static loadConfig(): AppConfig | undefined {
        return StorageManager.loadData<AppConfig>('app_config');
    }

    public static saveConfig(appConfig: AppConfig): void {
        StorageManager.saveData('app_config', appConfig);
    }

    public static loadGameSetupData<SetupData extends GameSetupData>(gameKey: GameKey): SetupData | undefined {
        return StorageManager.loadData(`${ gameKey }${ setupDataKeySuffix }`);
    }

    public static saveGameSetupData(gameKey: GameKey, saveState: GameSetupData): void {
        StorageManager.saveData(`${ gameKey }${ setupDataKeySuffix }`, saveState);
    }

    public static clearGameSetupData(gameKey: GameKey): void {
        StorageManager.clearData(`${ gameKey }${ setupDataKeySuffix }`);
    }

    public static loadGameState<StateData>(gameKey: GameKey): StateData | undefined {
        return StorageManager.loadData(`${ gameKey }${ saveDataKeySuffix }`);
    }

    public static saveGameState<StateData>(gameKey: GameKey, stateData: StateData): void {
        StorageManager.saveData(`${ gameKey }${ saveDataKeySuffix }`, stateData);
    }

    public static clearGameState(gameKey: GameKey): void {
        StorageManager.clearData(`${ gameKey }${ saveDataKeySuffix }`);
    }

    public static loadGameLogs(gameKey: GameKey): LogItem[] | undefined {
        return StorageManager.loadData(`${ gameKey }${ logsDataKeySuffix }`);
    }

    public static saveGameLogs(gameKey: GameKey, stateData: LogItem[]): void {
        StorageManager.saveData(`${ gameKey }${ logsDataKeySuffix }`, stateData);
    }

    public static clearGameLogs(gameKey: GameKey): void {
        StorageManager.clearData(`${ gameKey }${ logsDataKeySuffix }`);
    }

    public static clearAllGameData(gameKey: GameKey): void {
        StorageManager.clearGameSetupData(gameKey);
        StorageManager.clearGameState(gameKey);
        StorageManager.clearGameLogs(gameKey);
    }

    private static loadData<DataType>(key: string): DataType | undefined {
        const data: string | null = window.localStorage.getItem(key);
        return data ? JSON.parse(data) : undefined;
    }

    private static saveData<DataType>(key: string, data: DataType): void {
        window.localStorage.setItem(key, JSON.stringify(data));
    }

    private static clearData(key: string): void {
        window.localStorage.removeItem(key);
    }

}
