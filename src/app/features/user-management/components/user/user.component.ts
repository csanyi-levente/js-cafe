import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {v4 as uuidv4} from 'uuid';
import {Role} from "../../../../core/models/role.enum";
import {UserService} from "../../../../core/services/user.service";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  isEditing: boolean = false;
  role = '';
  editForm: FormGroup = this.formBuilder.group({
    id: new FormControl({value: null, disabled: true,}),
    username: [null, Validators.required],
    role: [Role.WAITER, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.role = this.authService.getLoggedInUser().role;

    this.initForm();
  }

  initForm(): void {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
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
    }
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
}
