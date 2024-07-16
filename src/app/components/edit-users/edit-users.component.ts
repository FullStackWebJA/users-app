import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user-service.service';
import { UserModel } from '../../model/User.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-users',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './edit-users.component.html',
  styleUrl: './edit-users.component.css',
})
export class EditUsersComponent implements OnInit {

  private router : Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private userService: UserService = inject(UserService);

  GENDERS : {  gender : string, value : string }[] | undefined ;
  DESIGNATIONS :  {  designation : string, value : string }[] | undefined ;

  editUser : UserModel | undefined = undefined;

  ngOnInit(): void {
    
    this.GENDERS = this.userService.fetchGenders();
    this.DESIGNATIONS = this.userService.fetchDesignations();

    this.activatedRoute.params.subscribe((params) => {
      const userId = params['userId'];
      this.editUser = this.userService.fetchUser(userId);
    });
  }

  onSubmit(editForm : NgForm ){
    this.userService.updateUser(this.editUser!);
    this.router.navigate(['/']);
  }

  goBack(){
    this.router.navigate(['/']);
  }

}
