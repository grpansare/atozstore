import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product-modal',
  templateUrl: './update-product-modal.component.html',
  styleUrls: ['./update-product-modal.component.css']
})
export class UpdateProductModalComponent {
  selectedFile!: any;
  imagePath: any = "";
  productForm: FormGroup;
  product: any | null = null;
  baseurl="https://atozstore1-latest-2.onrender.com/product"

  constructor(
    private fb: FormBuilder,
    public modalRef: MdbModalRef<UpdateProductModalComponent>,
    private http: HttpClient
  ) {
    // Initialize the form
    this.productForm = this.fb.group({
      productid: [null, Validators.required],
      productname: [null, Validators.required],
      category: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      quantity: [null, [Validators.required, Validators.min(0)]],
      offer: [null],
      colors: this.fb.array([]),
      sizes: this.fb.array([]),
      description: [null, Validators.required],
      selectedFile: ['']
    });
  }
  ngOnInit(): void {
    // Patch the form with the product values if product is available
    if (this.product) {

       console.log(this.product.productname);

      this.productForm.patchValue({
        productid: this.product.productid,
        productname: this.product.productname,
        category: this.product.category,
        price: this.product.price,
        quantity: this.product.quantity,
        offer: this.product.offer,
        description: this.product.description,






      });

    // Populate color controls if product has colors
    if (this.product && this.product.colors) {
      this.product.colors.forEach((color:any) => {
        this.addColorControl(color);
      });
    }
    if (this.product && this.product.sizes) {
      this.product.sizes.forEach((size:any) => {
        this.addSizeControl(size);
      });
    }

      this.imagePath = this.product.imageFile.filePath;



    }
  }
  addColorControl(colorValue: string = ''): void {
    this.colors.push(this.fb.control(colorValue));
  }
  addSizeControl(sizeValue: string = ''): void {
    this.sizes.push(this.fb.control(sizeValue));
  }
  get colors(): FormArray {
    return this.productForm.get('colors') as FormArray;
  }
  get sizes(): FormArray {
    return this.productForm.get('sizes') as FormArray;
  }


  // Method to send product data to the backend
  sendProductData() {

    const formData = this.productForm.value;

    formData.price = parseInt(formData.price, 10);
    formData.productid = parseInt(formData.productid, 10);
    formData.colors = JSON.stringify(formData.colors);
    formData.sizes = JSON.stringify(formData.sizes);


    const formDataToSend = new FormData();

    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    // Append colors

    // Append image file
    console.log(formData.productname)

    // Send the formData to the backend
    this.http.post<any>(this.baseurl+`/updateproduct`, formDataToSend).subscribe(
      response => {
        this.product=response;
        this.modalRef.close(response);
        // Handle response from the backend
        console.log('Response from backend:', response);
        Swal.fire('Success', 'Product Updated successfully!', 'success');
      },
      error => {
        // Handle error
        console.error('Error occurred:', error);
        Swal.fire('Error', 'Failed to send product data!', 'error');
      }
    );
  }
  addColor() {
    this.colors.push(this.fb.group({ color: ['', Validators.required] }));
  }

  removeColor(index: number) {
    this.colors.removeAt(index);
  }

  addSize() {
    this.sizes.push(this.fb.group({ size: ['', Validators.required] }));
  }

  removeSize(index: number) {
    this.sizes.removeAt(index);
  }

}
