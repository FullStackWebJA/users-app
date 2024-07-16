import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user-service.service';
import { Router } from '@angular/router';
import { UserModel } from '../../model/User.model';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.css',
})
export class AddUsersComponent {
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);

  GENDERS: { gender: string; value: string }[] | undefined;
  DESIGNATIONS: { designation: string; value: string }[] | undefined;

  userObj?: UserModel;

  ngOnInit(): void {
    this.GENDERS = this.userService.fetchGenders();
    this.DESIGNATIONS = this.userService.fetchDesignations();
  }

  onSubmit(addForm: NgForm) {   
    this.userObj = {
      user_Id: '',
      active: addForm.value.activeUser,
      designation: addForm.value.designationSelect,
      email_address: addForm.value.emailAddress,
      gender: addForm.value.genderSelect,
      user_Name: addForm.value.userName
    };

    this.userService.addUser(this.userObj);
    this.router.navigate(['/']);
  }

  file! : File;

  fileSelected(event : any){
    this.file = event.target!.files[0];
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
