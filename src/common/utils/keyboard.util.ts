import { filter, fromEvent, Observable } from 'rxjs';

export class KeyboardUtil {

    public static getKeyboardEvent(keys: string[]): Observable<KeyboardEvent> {
        return (fromEvent(document, 'keyup') as Observable<KeyboardEvent>).pipe(
            filter(keyboardEvent => keys.includes(keyboardEvent?.key)),
        );
    }

}
