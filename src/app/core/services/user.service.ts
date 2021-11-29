import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  findAll(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  findOneById(id: number): Observable<User | undefined> {
    return this.http.get<User>('http://localhost:3000/users/' + id);
  }

  findOneByUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>('http://localhost:3000/users?username=' + username)
      .pipe(
        map( responses => responses[0])
      );
  }

  update(user: User | undefined): Observable<unknown> {
    return this.http.put('http://localhost:3000/users/' + user?.id, user);
  }

  create(user: User | undefined): Observable<unknown> {
    return this.http.post('http://localhost:3000/users', user);
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete('http://localhost:3000/users/' + id);
  }
}
