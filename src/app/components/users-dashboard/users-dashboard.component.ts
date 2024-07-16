import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { UserModel } from '../../model/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  imports: [ ],
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.css'
})
export class UsersDashboardComponent implements OnInit{

  private userService : UserService = inject(UserService);
  private router : Router = inject(Router);

  dataSource : Signal<UserModel[] | undefined> = signal(undefined);

  USER_DATA_COLUMNS : { columnName: string; }[] | undefined ;

  ngOnInit(): void {
    this.USER_DATA_COLUMNS = this.userService.fetchColumns();
    this.dataSource = this.userService.fetchUsers();
  }

  editUser( userId : string ){
    this.router.navigate(['/edit-users', userId]);
  }

  deleteUser( userId : string ){
    this.userService.deleteUser( userId );
  }

  addUser(){
    this.router.navigate(['/add-users']);
  }
}
