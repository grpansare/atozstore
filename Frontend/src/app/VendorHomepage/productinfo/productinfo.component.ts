import { Component, Input } from '@angular/core';
import { UpdateProductModalComponent } from '../update-product-modal/update-product-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-productinfo',
  templateUrl: './productinfo.component.html',
  styleUrl: './productinfo.component.css'
})
export class ProductinfoComponent {

  @Input() product:any;
  modalRef: MdbModalRef<UpdateProductModalComponent> | null = null;

  constructor(private modalService: MdbModalService) {}
  openUpdateProductModal() {
    console.log(this.product)
    this.modalRef = this.modalService.open(UpdateProductModalComponent, {
      data:{product :this.product},
      modalClass: 'modal-xl'
    });

    this.modalRef.onClose.subscribe((data: any) => {

      this.product=data;
    });
  }
}
