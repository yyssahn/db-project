import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Product } from './product'

@Injectable()
export class DuberProductFilterService{

  getHighestTHC(totalProductList, budget){
    let filteredList = [];
    for (let _i = 0; _i < totalProductList.length ; _i++){
      let temp = totalProductList[_i].shift();
      budget -= temp.price;
      filteredList.push(temp);
    }
    while(budget > 0){
      let temp = this.findMaxValue(totalProductList);

    }
    console.log(filteredList);
    console.log(budget);
    return filteredList;
  }

  findMaxValue(){
    return null;
  }

}
