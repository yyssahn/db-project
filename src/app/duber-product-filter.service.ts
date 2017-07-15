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
    let temp = this.findMaxValue(totalProductList);
    while (budget > 0){
    let temp = this.findMaxValue(totalProductList);
    if((budget - temp.price) <0){
        break;
    }else {
        filteredList.push(temp);
        budget -= temp.price;
        }
    }
    return filteredList;
  }

  findMaxValue(totalProductList){
    let max = totalProductList[0][0];
    let maxPosition = 0;
    for (let _i = 0; _i < totalProductList.length-1; _i++){
      if (totalProductList[_i+1][0].thc_value > max.thc_value){
        max = totalProductList[_i+1][0];
        maxPosition = _i+1;
      }
    }
    return totalProductList[maxPosition].shift();
  }

}
