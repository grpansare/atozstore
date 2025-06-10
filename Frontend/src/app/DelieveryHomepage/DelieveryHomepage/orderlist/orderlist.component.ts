import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent {
  @Input() order: any;
  totalPrice: number = 0;
  discount: number = 0; // New property to store discount

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order'] && !changes['order'].firstChange) {
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    this.discount = 0; // Reset discount for each order
    if (this.order && this.order.productsList && this.order.productsList.length > 0) {
      this.totalPrice = this.order.productsList.reduce((total: number, product: any) => {
        if (product.offer !== 'null') {
          return total + (this.calculateDiscountedPrice(product) || 0);
        } else {
          return total + (product.price || 0);
        }
      }, 0);
    }
  }

  calculateDiscountedPrice(element: any): number {
    let discount = 0;
    const discountPercentage = parseFloat(element.offer.replace('%', ''));
    const finalPrice = element.price - (element.price * discountPercentage / 100);
    discount = element.price - finalPrice;
    this.discount += discount; // Accumulate discount for all products
    return finalPrice;
  }
}
