import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../../../core/models/user.model";
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  delete(id: number): void {
    this.userService.delete(id).subscribe( () => this.loadUsers());
  }

  loadUsers(): void {
    this.userService.findAll().subscribe( users => this.users = users);
  }
}
