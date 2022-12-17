import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
    constructor() { }

    private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private isLoading$ = this.isLoading.asObservable();

    show(): void {
        this.isLoading.next(true);
    }

    hide(): void {
        this.isLoading.next(false);
    }

    loaderState(): Observable<boolean> {
        return this.isLoading$;
    }
}
