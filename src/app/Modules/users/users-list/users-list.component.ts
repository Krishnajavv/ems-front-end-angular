import { Component, OnInit } from '@angular/core';
import { userSchema } from '../Models/userSchema';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  p: number = 1;
  searchKey:string=""

  allUsers:userSchema[]=[]

  constructor(private api:ApiService, private toastr:ToastrService){}

ngOnInit(): void {
  this.getAllUserList()
}

  getAllUserList(){
    this.api.getAllUserAPI().subscribe({
      next:(result:any)=>{
       
        this.allUsers=result
        console.log(this.allUsers);
        
        
      },
      error:(reason:any)=>{
        console.log(reason);
        
      }
    })

  }
  

  deleteUser(id:any){

    this.api.removeUserAPI(id).subscribe((res:any)=>{
      this.toastr.success("user removed")
      this.getAllUserList()
    })
  }

  generatePDF(){
    let pdf=new jsPDF()
    let head=[["EmpId","Username","Email","Status"]]
    let body:any=[]
    this.allUsers.forEach((item:any)=>{
      if(item.id!==1){
        body.push([item.empId,item.name,item.email,item.status])
      }
    })
    pdf.setFontSize(16)
    pdf.text("All Users List",10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save('allUserslist.pdf')
  }

  sortById(){
    this.allUsers.sort((user1:any,user2:any)=>user1.empId.localeCompare(user2.empId))
  }

  sortByName(){
    this.allUsers.sort((user1:any,user2:any)=>user1.name.localeCompare(user2.name))
  }



}
