import { Injectable } from '@angular/core';
import {SpotModel} from "../models/spot.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  constructor() { }

  findAll(): SpotModel[] {
    const spotsJSON = localStorage.getItem(environment.spotsKey);

    return spotsJSON ? JSON.parse(spotsJSON) : [];
  }

  createAll(spots: SpotModel[]): void {
    localStorage.setItem(environment.spotsKey, JSON.stringify(spots));
  }

  findOneById(id: string): SpotModel | null {
    const spots: SpotModel[] = this.findAll();

    const result = spots.filter( item => item.id === id).shift();

    return result === undefined ? null : result;
  }

  deleteById(id: string): void {
    let spots = this.findAll();
    localStorage.setItem(environment.spotsKey, JSON.stringify(spots.filter( item => item.id !== id )));
  }
}
