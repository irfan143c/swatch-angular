import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FilterService {
  filterSource = new BehaviorSubject("");
  searchFilterValue = this.filterSource.asObservable();

  constructor() { }

  sendFilter(filterData: string) {
    this.filterSource.next(filterData)
    // console.log(this.searchFilterValue);
    
  }

}
