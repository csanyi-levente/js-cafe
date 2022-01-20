import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {Role} from "../../../core/models/role.enum";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  chiefRole = Role.CHIEF;
  username = '';
  role = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe( data => {
      this.isLoggedIn = data;
      if (data == true) {
        const loggedInUser = this.authService.getLoggedInUser()
        this.username = loggedInUser.username;
        this.role = loggedInUser.role;
      } else {
        this.username = '';
        this.role = '';
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  openProfile(): void {
    this.router.navigate(['users/user/' + this.authService.getLoggedInUser().id]);
  }
}
