import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';
import {Role} from "../models/role.enum";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  findAll(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  findOneById(id: number): Observable<User | undefined> {
    return this.http.get<User>('http://localhost:3000/users/' + id);
  }

  findOneByUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>('http://localhost:3000/users?username=' + username)
      .pipe(
        map( users => users[0])
      );
  }

  update(user: User | undefined): Observable<unknown> {
    return this.http.put('http://localhost:3000/users/' + user?.id, user);
  }

  create(user: User | undefined): Observable<User | any> {
    if (this.authService.getLoggedInUser().role === Role.CHIEF) {
      return this.http.post<User | any>('http://localhost:3000/users', user);
    } else {
      return of('permission error');
    }
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete('http://localhost:3000/users/' + id);
  }
}
