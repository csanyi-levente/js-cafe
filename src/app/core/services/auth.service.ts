import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie";
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) { }

  login(user: User): void {
    this.cookieService.put('user', JSON.stringify(user));
    this.router.navigate(['spots']);
    this.userLoggedIn.next(true);
  }

  logout(): void {
    this.cookieService.remove('user');
    this.router.navigate(['']);
    this.userLoggedIn.next(false);
  }

  getLoggedInUser(): User {
    return JSON.parse(this.cookieService.get('user'));
  }

  get isLoggedIn() {
    return this.userLoggedIn.asObservable();
  }
}
