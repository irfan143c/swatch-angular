import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GriddataService {

    gridStatus = new BehaviorSubject<boolean>(true);


    gridSource = new BehaviorSubject("");
    singleGridData = this.gridSource.asObservable();

    constructor() { }

    sendData(data: any) {
        this.gridSource.next(data)

    }

}