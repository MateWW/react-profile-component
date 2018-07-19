import { Observable, from, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface HttpParams {
    body?: any;
    params?: Record<string, string>;
}

export class HttpService {
    public get<T>(url: string, params: Record<string, string> = {}): Observable<T> {
        return this.httpRequest<T>(url, 'GET', { params });
    }

    public post<T>(url: string, body: any): Observable<T> {
        return this.httpRequest<T>(url, 'POST', { body });
    }

    public httpRequest<T>(url: string, method: 'GET' | 'POST', { body, params }: HttpParams): Observable<T> {
        const queryString = Object.entries(params || {}).reduce(
            (acc, [key, value]) => `${acc}${acc.length ? '&' : ''}${key}=${value}`,
            '',
        );
        const extendedUrl = url + encodeURI('?' + queryString);
        return from(
            fetch(extendedUrl, { headers: { 'Content-Type': 'application/json' }, method, body: JSON.stringify(body) }),
        ).pipe(switchMap(value => (value.status !== 200 ? throwError(value.body) : value.json())));
    }
}
