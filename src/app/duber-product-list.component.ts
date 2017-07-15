import { Component, Input } from '@angular/core';
import { DuberProductSearchService } from './duber-product-search.service';
import { DuberProductFilterService } from './duber-product-filter.service';

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
    totalProductList : Product[][];
    constructor(
      private duberProductSearchService : DuberProductSearchService,
      private duberProductFilterService : DuberProductFilterService){
    }

    ngOnInit(){
    }

    ngOnChanges(changes) {
      console.log(changes);
      for (let propName in changes) {
        let chng = changes[propName];
        let cur  = JSON.stringify(chng.currentValue);
        let prev = JSON.stringify(chng.previousValue);
        if (propName === "locationList" && cur !== prev){
          console.log(this.locationList);
          console.log(this.budget);
          this.storeListSize = this.locationList.length;
          this.storeListCount = 0;
          this.totalProductList = [];
          for (let store of this.locationList){
              this.duberProductSearchService.getProductsFromStore(store, this.budget).then(result=>{
              result = result.sort(
                function(x,y){
                  return y.thc_value - x.thc_value;
                }
              );
              this.totalProductList.push(result);
              this.storeListCount++;
            });
          }
        }

      }

    }

    ngDoCheck(){
      if (this.storeListSize === this.storeListCount){
        console.log(this.totalProductList);
        this.productList = this.duberProductFilterService.getHighestTHC(this.totalProductList, this.budget);

      }

    }
}
