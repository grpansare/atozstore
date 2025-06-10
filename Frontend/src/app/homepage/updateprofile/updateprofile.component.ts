import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.css'
})
export class UpdateprofileComponent {
  @Output() userUpdated = new EventEmitter<any>();
@Input() user!:any;
gender!:any;


  constructor(private http:HttpClient,private router:Router){


  }
  ngOnInit(): void { // Initialize user properties, including gender
    if (!this.user) {
      this.user =
        // Initialize user object with default values if it's not provided by the parent component
        this.gender= this.user.gendor // Initialize gender property with an empty string
        // Add other properties as needed

    }
  }
  private modalService = inject(NgbModal);
	closeResult = '';
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
};
  open(content: any) {


    this.modalService.open(content, this.ngbModalOptions).result.then((result) => {
      if (result === 'Save click') {
        this.saveUserInfo();
        this.userUpdated.emit(this.user)

      }
      else{



      }
    },
			(reason) => {
      },
		);
	}

	private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
        case ModalDismissReasons.BACKDROP_CLICK:
          return 'by clicking on a backdrop';
          default:
            return `with: ${reason}`;
          }
        }


        saveUserInfo() {
         this.http.post("https://atozstore1-latest-2.onrender.com/user/updateuser",this.user).subscribe(
          (response:any)=>{
            console.log(response);


          },
          (error:any)=>{
            console.log(error);

          }
         )
        }
      }

