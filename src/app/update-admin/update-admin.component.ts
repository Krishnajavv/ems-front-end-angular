import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
  @Output() onAdminChange=new EventEmitter()
  adminDetails:any={}
  editAdminStatus:boolean=false
  profilePicture:string="https://th.bing.com/th/id/R.6ae74c5f86466ef4f6fc6253c767381a?rik=5DSgIRvIaK7UPw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-Avatar-PNG.png&ehk=GVMh4KTpyOBERsOt5H%2b8TcGp%2bS8DdbR6niBs54kRaYA%3d&risl=&pid=ImgRaw&r=0"
 
  constructor(private adminAPI:AdminService, private toastr:ToastrService){}

  ngOnInit(): void {
    this.adminAPI.getAdminDetails().subscribe((res:any)=>{
      this.adminDetails=res
      if(res.profilePic){
        this.profilePicture=res.profilePic
      }
    })
  }

  onCancel(){
    this.editAdminStatus=false
  }

  editBtn(){
    this.editAdminStatus=true
  }

  getFile(event:any){
    let file= event.target.files[0]
    let fr=new FileReader()
    fr.readAsDataURL(file)
    fr.onload=(event:any)=>{
      console.log(event.target.result);
      this.profilePicture=event.target.result
      this.adminDetails.profilePic=event.target.result
      
    }
  }

  editAdmin(){
    this.adminAPI.updateAdminAPI(this.adminDetails).subscribe({
      next:(res:any)=>{
        this.editAdminStatus=false
        this.toastr.success("Admin details updated")
        sessionStorage.setItem("adminDetails",JSON.stringify(res))
        this.onAdminChange.emit(res.name)

      },
      error:(reason:any)=>{
        console.log(reason);

        this.toastr.warning("can't updated")
        
      }
    })
  }
}
