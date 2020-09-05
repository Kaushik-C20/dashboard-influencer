import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { InfModel } from '../influencer-search/inf.model';

@Injectable({
    providedIn: 'root'
})
export class InfService {
    private _infList = new BehaviorSubject<InfModel[]>([]);
    constructor(private http: HttpClient) { }
    
    get infList() {
        return this._infList.asObservable();
    }

    fetchInfs() {
        return this.http.post<{ success: string, users: InfModel[] }>('https://dev.shopcom.in/hashtag/shopcom-dev/public/all-users-profile-by-platform', { platform: "instagram" })
            .pipe(map(data => {
                console.log(data);
                return data.users;
            }), tap((infs: InfModel[]) => {
                this._infList.next(infs);
            }));
    }

}