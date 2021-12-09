import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {AuthService} from "../../../../core/services/auth.service";
import {WeatherService} from "../../../../core/services/weather.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = "";
  errorMsg: string = "";
  userCount = 0;
  cityTemp = 0;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    const weatherObservable = this.weatherService.findAll();
    const usersObservable = this.userService.findAll();
    forkJoin(weatherObservable, usersObservable).subscribe(result => {
      // @ts-ignore
      console.log("forkJoin", result[0][0]['temperature']);

      // @ts-ignore
      this.cityTemp = result[0][0]['temperature'];
      this.userCount = result[1].length;
      // TODO: continue here + destroy object subject
      // https://user-images.githubusercontent.com/29947725/59845454-9bd32c80-939c-11e9-818a-fbfab0f735be.png
    })
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
