import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {catchError, Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<boolean> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.userService.findAll();
  }
}
