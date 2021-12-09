import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private client: HttpClient) { }

  findAll(): Observable<User[]> {
    return this.client.get<User[]>('http://localhost:3000/city');
  }
}
