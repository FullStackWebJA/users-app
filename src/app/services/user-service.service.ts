import { Injectable, Signal, signal } from '@angular/core';
import { UserModel } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    
  private USER_DATA_COLUMNS  = [
    // { columnName :  'User Id'},
    { columnName :  'User Name'},
    { columnName :  'Email Address'},
    { columnName :  'Gender'},
    { columnName :  'Designation'},
    { columnName :  'Active'},
    { columnName :  'Actions'},
  ];

  private GENDERS = [
    { gender : 'Male', value : 'male'},
    { gender : 'Female', value : 'female'},
    { gender : 'Others', value : 'other'},
  ];

  private DESIGNATIONS = [
    { designation : 'SDE 2', value : 'sde2'},
    { designation : 'SDE 3', value : 'sde3'},
    { designation : 'SDE 4', value : 'sde4'},
    { designation : 'Manager', value : 'manager'},
    { designation : 'Tester', value : 'tester'},
    { designation : 'Tech Lead', value : 'techLead'}
  ];
  

  private users_data = signal<UserModel[] | undefined >( undefined );

  constructor() {
    this.users_data.set([
      { user_Id : 'user1', user_Name : 'John Smith', email_address : 'john@usersdata.com', gender : 'male', designation : 'sde2', active : true},
      { user_Id : 'user2', user_Name : 'Marie Roseline', email_address : 'marie@usersdata.com', gender : 'female', designation : 'sde3', active : false},
      { user_Id : 'user3', user_Name : 'Peter Parker', email_address : 'peter@usersdata.com', gender : 'male', designation : 'sde4', active : true},
      { user_Id : 'user4', user_Name : 'Rosy White', email_address : 'rosy@usersdata.com', gender : 'female', designation : 'manager', active : true},
      { user_Id : 'user5', user_Name : 'Jasmine Walker', email_address : 'jasmine@usersdata.com', gender : 'female', designation : 'tester', active : false},
      { user_Id : 'user6', user_Name : 'Alan Woods', email_address : 'alan@usersdata.com', gender : 'male', designation : 'tester', active : true},
      { user_Id : 'user7', user_Name : 'Michael Specter', email_address : 'michael@usersdata.com', gender : 'male', designation : 'techLead', active : false}
    ]);
   }

   fetchColumns(){
    return this.USER_DATA_COLUMNS.slice();
   }

   fetchGenders(){
    return this.GENDERS.slice();
   }

   fetchDesignations(){
    return this.DESIGNATIONS.slice();
   }

   fetchUsers() : Signal<UserModel[] | undefined >{
     return this.users_data.asReadonly();
   }

   fetchUser( userId : string ) : UserModel | undefined {
      return this.users_data()?.find( user => user.user_Id === userId);
   }
   
   deleteUser( userId : string ){
    this.users_data.update( data => data?.filter( user => user.user_Id !== userId));
   }

   updateUser( userObj : UserModel){
    const index = this.users_data()?.findIndex(user => user.user_Id === userObj.user_Id);
    if( index !== -1) {
         this.users_data()![index!] = userObj;
    }
   }

   addUser( userObj : UserModel){
    userObj.user_Id = 'user' + this.users_data()?.length;
    this.users_data()?.push(userObj);
   }
}
