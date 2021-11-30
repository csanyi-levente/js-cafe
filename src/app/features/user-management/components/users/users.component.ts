import { Component, OnInit } from '@angular/core';
import {User} from "../../../../core/models/user.model";
import {UserService} from "../../../../core/services/user.service";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  loggedInUser: User | undefined;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  delete(id: number): void {
    this.userService.delete(id).subscribe( () => this.loadUsers());
  }

  loadUsers(): void {
    this.userService.findAll().subscribe( users => this.users = users);
  }
}
