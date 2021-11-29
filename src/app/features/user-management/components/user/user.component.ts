import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {v4 as uuidv4} from 'uuid';
import {Role} from "../../../../core/models/role.enum";
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  editForm: FormGroup = this.formBuilder.group({
    id: new FormControl({
      value: uuidv4(),
      disabled: true,
    }),
    username: [null, Validators.required],
    role: [Role.WAITER, Validators.required]
  });
  isEditing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.userService.findOneById(userId).subscribe( (user) => {
        this.editForm.controls['id'].setValue(user?.id);
        this.editForm.controls['username'].setValue(user?.username);
        this.editForm.controls['role'].setValue(user?.role);

        this.isEditing = true;
      });
    } else {
      this.isEditing = false;
    }
  }

  onSubmit() {
    if (this.isEditing) {
      this.userService.update(this.editForm.getRawValue()).subscribe( () => {});
    } else {
      this.userService.create(this.editForm.getRawValue()).subscribe( () => {});
    }
  }
}
