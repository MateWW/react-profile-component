export interface Action<T, P = null> {
    type: T;
    payload?: P;
}

export function createAction<T>(fn: (...params: any[]) => T): (...params: any[]) => T {
    return fn;
}
