import { Component, Input } from '@angular/core';
import { DuberProductSearchService } from './duber-product-search.service';


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

    constructor(
      private duberProductSearchService : DuberProductSearchService){
    }


    ngOnChanges(changes) {
      console.log(changes);
      for (let propName in changes) {
        let chng = changes[propName];
        let cur  = JSON.stringify(chng.currentValue);
        let prev = JSON.stringify(chng.previousValue);

        if (propName === "locationList" && cur !== prev){
          console.log(this.locationList);
          this.duberProductSearchService.getProductsFromStore(this.locationList[0].id, this.budget);

        }

      }

    }
}
