import { Component, Input } from '@angular/core';
import { DuberProductSearchService } from './duber-product-search.service';


@Component({
  selector:'db-product-list',
  template: `{{ locationList[0].address }}`
})

export class DuberProductList{


    @Input() locationList;
    oldLocationList;
    storeListSize;
    storeListCount;

    constructor(
    private duberProductSearchService : DuberProductSearchService){
    }

    ngDoCheck(){
    if(this.locationList !== this.oldLocationList){
        this.storeListSize = this.locationList.length;
        this.storeListCount = 0;

        this.oldLocationList = this.locationList;
      }
    }
}
