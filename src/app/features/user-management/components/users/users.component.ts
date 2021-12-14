import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../core/models/user.model";
import {UserService} from "../../../../core/services/user.service";
import {AuthService} from "../../../../core/services/auth.service";
import {EventManagerService} from "../../../../core/services/event-manager.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[] = [];
  loggedInUser: User | undefined;
  debugDate: number;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private eventManagerService: EventManagerService
  ) {
    this.debugDate = new Date().getMilliseconds();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loggedInUser = this.authService.getLoggedInUser();

    this.eventManagerService.colorSubject$.subscribe(data => console.log('colorsubject sub', data));
  }

  callColorSubject(): void {
    this.eventManagerService.emitColor('#000000');
  }

  delete(id: number): void {
    this.userService.delete(id).subscribe( () => this.loadUsers());
  }

  loadUsers(): void {
    this.userService.findAll().subscribe( users => this.users = users);
  }

  ngOnDestroy(): void {
  }
}
