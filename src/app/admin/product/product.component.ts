import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';
import { Product } from 'src/app/_models/product';

import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {
  products: Product[] = [];
  editProduct: Product | undefined; // the product currently being edited

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  @ViewChild('productEditInput')
  set productEditInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => (this.products = products)
    );
  }

  share() {
    window.alert('The product has been shared!');
  }

  addToCart(product: Product) {
    // this.cartService.addToCart(product);
    // window.alert('Your product has been added to the cart!');
  }

  editName(name:string) {
    if (name && this.editProduct && this.editProduct.name !== name) {
      this.productService
        .updateProduct({...this.editProduct, name: name})
        .subscribe(product => {
        // replace the product in the product list with update from server
        const ix = product ? this.products.findIndex(p => p.id === product.id) : -1;
        if (ix > -1) {
          this.products[ix] = product;
        }
      });
      this.editProduct = undefined;
    }
  }

  editDesc(desc:string) {
    if (desc && this.editProduct && this.editProduct.description !== desc) {
      this.productService
        .updateProduct({...this.editProduct, description: desc})
        .subscribe(product => {
        // replace the product in the product list with update from server
        const ix = product ? this.products.findIndex(p => p.id === product.id) : -1;
        if (ix > -1) {
          this.products[ix] = product;
        }
      });
      this.editProduct = undefined;
    }
  }

  editPrice(priceS:string) {
    let price = parseInt(priceS, 10);
    if (price && this.editProduct && this.editProduct.price !== price) {
      this.productService
        .updateProduct({...this.editProduct, price: price})
        .subscribe(product => {
        // replace the product in the product list with update from server
        const ix = product ? this.products.findIndex(p => p.id === product.id) : -1;
        if (ix > -1) {
          this.products[ix] = product;
        }
      });
      this.editProduct = undefined;
    }
  }

  delete(product: Product) {
    this.products = this.products.filter(p => p !== product);
    this.productService
      .deleteProduct(product.id)
      .subscribe();
  }
}



