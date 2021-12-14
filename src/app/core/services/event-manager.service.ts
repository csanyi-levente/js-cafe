import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  colorSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('#FFFFFF');
  //colorSubject$: Subject<string> = new Subject<string>();
  //colorEmitter: EventEmitter<string> = this.colorSubject$.asObservable();

  constructor() { }

  emitColor(color: string): void {
    this.colorSubject$.next(color);
  }
}
