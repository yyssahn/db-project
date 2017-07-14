import { Component, Input } from '@angular/core';
import { DuberProductSearchService } from './duber-product-search.service';


import { Product } from './product';

@Component({
  selector:'db-product-list',
  template: `{{ 'hello' }}`
})

export class DuberProductList{


    @Input() locationList;
    @Input() budget;
    oldLocationList;
    storeListSize;
    storeListCount;
    aProduct: Product;
    productList : Product[];
    constructor(
      private duberProductSearchService : DuberProductSearchService){
    }

    ngOnInit(){
      this.aProduct = {name:"ddd",price:2,address:"2",city:"d",thc:2};
      console.log(this.aProduct);
    }

    ngOnChanges(changes) {
      console.log(changes);
      for (let propName in changes) {
        let chng = changes[propName];
        let cur  = JSON.stringify(chng.currentValue);
        let prev = JSON.stringify(chng.previousValue);

        if (propName === "locationList" && cur !== prev){
          console.log(this.locationList);
          console.log(budget);
          this.duberProductSearchService.getProductsFromStore(this.locationList[0], this.budget).then(result=>result);

        }

      }

    }
}
