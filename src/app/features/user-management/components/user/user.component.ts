import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {v4 as uuidv4} from 'uuid';
import {Role} from "../../../../core/models/role.enum";
import {UserService} from "../../../../core/services/user.service";
import {AuthService} from "../../../../core/services/auth.service";
import {Subject, Subscription, takeUntil} from "rxjs";
import {User} from "../../../../core/models/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject();
  isEditing: boolean = false;
  role = '';
  editForm: FormGroup = this.formBuilder.group({
    id: new FormControl({value: null, disabled: true,}),
    username: [null, Validators.required],
    role: [Role.WAITER, Validators.required]
  });
  debugDate: number;
  navigationEndSubscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {
    this.debugDate = new Date().getMilliseconds();
  }

  ngOnInit(): void {
    this.role = this.authService.getLoggedInUser().role;
    this.subscribeToUrlParamChanges();
  }

  subscribeToUrlParamChanges() {
    this.route.params
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe( params => {
      const userId = params['kutyaId'];
      this.userService.findOneById(userId).subscribe(user => {
        console.log("user ", user);
        this.editForm.controls['id'].setValue(user?.id);
        this.editForm.controls['username'].setValue(user?.username);
        this.editForm.controls['role'].setValue(user?.role);

        if (user?.id === this.authService.getLoggedInUser().id) {
          this.editForm.controls['role'].disable();
        }

        this.isEditing = true;
      });
    });
  }

/*  subscribeToRouterOnNavigationEnd(): void {
    this.navigationEndSubscription = this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        //this.initForm();
      }
    });
  }
*/
  initForm(): void {

    /*if (userId) {
      this.userService.findOneById(userId).subscribe( (user) => {
        this.editForm.controls['id'].setValue(user?.id);
        this.editForm.controls['username'].setValue(user?.username);
        this.editForm.controls['role'].setValue(user?.role);

        if (user?.id === this.authService.getLoggedInUser().id) {
          this.editForm.controls['role'].disable();
        }

        this.isEditing = true;
      });
    } else {
      this.isEditing = false;
    }

    if (this.role !== Role.CHIEF) {
      this.editForm.controls['role'].disable();
    }*/
  }

  onSubmit() {
    if (!this.editForm.getRawValue().id) {
      this.editForm.controls['id'].setValue(uuidv4());

      this.userService.create(this.editForm.getRawValue()).subscribe( resp => {
          if (!resp.id) {
            alert('Nono, ehhez nincs jogosultságod!');
          }
        },
        error => {
          alert("SERVER ERROR!!!" + error.message);
        }
      );
    } else {
      this.userService.update(this.editForm.getRawValue()).subscribe( () => {});
    }
  }

  ngOnDestroy(): void {
    //this.navigationEndSubscription?.unsubscribe();
    //this.paramSubscription?.unsubscribe();

    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
