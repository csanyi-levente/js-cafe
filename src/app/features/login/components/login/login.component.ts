import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = "";
  errorMsg: string = "";

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.findOneByUsername(this.username).subscribe( (user) => {
       if (!user) {
         this.errorMsg = "Sikertelen bejelentkezés..."
       } else {
         this.errorMsg = ""
         this.authService.login(user);
       }
    });
  }
}
