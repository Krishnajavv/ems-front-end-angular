import { Component, OnInit } from '@angular/core';
import { userSchema } from '../Models/userSchema';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user:userSchema={}
  constructor(private route:ActivatedRoute, private api:ApiService, private toastr:ToastrService){

  }
  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      const {id}=res
      this.getUserDetails(id)
      
    })
  }
  getUserDetails(userId:string){
    this.api.getSingleUserAPI(userId).subscribe((res:any)=>{
      this.user=res
      console.log(this.user);
      
    })
  }
  cancel(userId:any){
    this.getUserDetails(userId)
  }

  update(id:any){
    this.api.updateUserAPI(id,this.user).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success("user details updated")

        
      },
      error:(reason:any)=>{
        console.log(reason.message);
        this.toastr.warning(reason.message)
        
      }
    })
  }


}
