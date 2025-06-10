import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductdialogComponent } from '../productdialog/productdialog.component';

@Component({
  selector: 'app-offered-products',
  templateUrl: './offered-products.component.html',
  styleUrls: ['./offered-products.component.css']
})
export class OfferedProductsComponent {
  products: any[] = [];

  user: any = {};
  selectedSize: string | null = null;
  selectedColor!: String;

  baseurl = "https://atozstore1-latest-2.onrender.com";

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {
    this.getOfferedProducts();
  }

  ngOnInit(): void {
  }

  openDialog(product: any) {
    const dialogRef = this.dialog.open(ProductdialogComponent, {
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed, if needed
      console.log('The dialog was closed');
    });
  }

  getOfferedProducts() {
    this.http.get(this.baseurl + "/product/getOfferedProducts").subscribe(
      (success: any) => {


        // Splitting products into arrays of 3 products each
        this.products = this.chunkArray(success, 3);
        console.log(this.products);

      },
      error => {
        console.log(error);
      }
    );
  }

  // Function to chunk array into arrays of specific size
  chunkArray(array: any[], size: number): any[] {
    const chunkedArray = [];

    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }
}
