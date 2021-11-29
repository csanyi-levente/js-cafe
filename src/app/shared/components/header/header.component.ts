import { Component, OnInit } from '@angular/core';
import {User} from "../../../core/models/user.model";
import {UserService} from "../../../core/services/user.service";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  count: number = 0;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }

  openProfile(): void {
    const user = this.authService.getLoggedUser();
    this.router.navigate(['users/user/' + user.id]);
  }
}
