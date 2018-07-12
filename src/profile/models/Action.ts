export interface Action<T, P = null> {
    type: T;
    payload: P;
}
