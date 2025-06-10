import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UpdateProductModalComponent } from '../update-product-modal/update-product-modal.component';

@Component({
  selector: 'app-vendordetails',
  templateUrl: './vendordetails.component.html',
  styleUrls: ['./vendordetails.component.css']
})
export class VendordetailsComponent {
  showdropdown: boolean = false;
  vendor:any="";
  products: any[] = [];
  product: any = {};
  noproducts!:boolean;


  constructor(private router: Router, private http: HttpClient,private dialog: MatDialog) {


    this.vendor=sessionStorage.getItem('user');


    this.vendor=sessionStorage.getItem('vendor');

    this.vendor=JSON.parse(this.vendor)
    this.fetchData();
  }

  changeDropDown() {
    this.showdropdown = !this.showdropdown;
  }

  showprodinfo(product: any) {
    this.product = product;
  }

  // You need to provide a URL for the HTTP request
  fetchData() {
    if(this.vendor!=null){
    this.http.get(`https://atozstore1-latest-2.onrender.com/vendor/getProducts/${this.vendor.username}`).subscribe
    ((data: any) => {
this.products=data;
console.log(this.products)

this.product=this.products[0];
if(this.products.length==0){
  this.noproducts=true;
}
    });
  }
}
  deleteProduct(productid:any){
    this.http.delete(`https://atozstore1-latest-2.onrender.com/product/deleteProductById/${productid}`).subscribe(
      (response:any)=>{
            this.fetchData()
      },
      (error:any)=>{

      }
    )
  }
  openConfirmationDialog(productid:any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

       this.deleteProduct(productid)
      } else {

      }
    });
  }
}
