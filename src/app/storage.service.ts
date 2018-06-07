import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observer } from 'rxjs';

import { Observable } from 'rxjs/observable';

@Injectable()
export class StorageService {
    
    get isValid(): boolean {
        return false;
    }

    constructor(
        private router: Router
    ) { }

    setItem(key, value, session = true) {
        if (session) {
            sessionStorage.setItem(key, value);
        }
        else {
            localStorage.setItem(key, value);
        }
    }

    getItem(key) {
        var val = localStorage.getItem(key);
        if (!val)
            val = sessionStorage.getItem(key);

            return val;
    }

    removeItem(key) {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
    }
}