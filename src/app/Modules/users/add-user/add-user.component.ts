import { Component } from '@angular/core';
import { userSchema } from '../Models/userSchema';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
 user:userSchema={}
constructor(private api:ApiService, private toastr:ToastrService){}

cancel(){
  this.user.empId=""
  this.user.name=""
  this.user.email=""
  this.user.status=""

}





addUser(){

  this.api.addUserAPI(this.user).subscribe({
    next:(res:any)=>{
      this.toastr.success("user add successfully")
      this.cancel()
    },
    error:(reason:any)=>{
      console.log(reason);
      
    }

  })


  }



}
