import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie";
import {User} from "../models/user.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) { }

  login(user: User): void {
    this.cookieService.put('user', JSON.stringify(user));
    this.router.navigate(['users']);
  }

  logout(): void {
    this.cookieService.remove('user');
    this.router.navigate(['']);
  }

  getLoggedUser(): User {
    return JSON.parse(this.cookieService.get('user'));
  }

  isLogged(): boolean {
    return this.cookieService.get('user') !== undefined;
  }
}
