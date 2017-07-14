import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Product } from './product'

@Injectable()
export class DuberProductSearchService{

  constructor(private http: Http, private jsonp: Jsonp){}


  getProductsFromStore(location, budget){

    var flowerurl = `
      https://admin.duberex.com/vendors/${location.id}/search.json?auto_off=web_online&categories%5B%5D=Flowers%25&include_subcategory=false&metadata=1&offset=0&order_by=price&sort_order=asc&web_online=true
    `;
    var prerollurl = `
      https://admin.duberex.com/vendors/${location.id}/search.json?auto_off=web_online&categories%5B%5D=pre-rolls%25&include_subcategory=false&metadata=1&offset=0&order_by=price&sort_order=asc&web_online=true
    `;
    var flowerList;

    return this.http.get(flowerurl).toPromise().then(result=>{
      flowerList = this.organizeFlowerProducts(result.json(),location.address, location.city,budget);
      return this.http.get(prerollurl).toPromise().then(result=>{
        this.organizePreRollProducts(result.json(), location.address, location.city, budget, flowerList);
      });
    });

  }

  organizeFlowerProducts(result, address, city,budget){
      console.log(result);
      console.log(budget);
      var productList = [];
      for (let item of result.products.items){
        if (item.price<=budget){
          //productList.push(item);
          this.pushtoList(productList, item, address, city);
        }else{
          console.log(productList);
          return productList;
        }
      }
      console.log(productList);
      return productList;
  }


  pushtoList(productList,product, storeAddr,storeCity){
    var length = productList.length;
    if (length ===0 ){
      productList.push({name:product.name, price:product.price, address: storeAddr, city:storeCity, thc:product.thc_range[0]});
    }else{
      if (product.price === productList[length-1].price){
        if(product.thc_range[0]>productList[length-1].thc){
          productList[length-1] = {name:product.name, price:product.price, address: storeAddr, city:storeCity, thc:product.thc_range[0]};
        }
      }else{
        productList.push({name:product.name, price:product.price, address: storeAddr, city:storeCity, thc:product.thc_range[0]});
      }
    }

  }

  organizePreRollProducts(result, address, city, budget, flowerList){
    console.log("organizePreroll");
    for (let item of result.products.items){
      if (item.price<=budget){
        this.updateListWithRolls(flowerList, item, address, city);
      }else{
      console.log(flowerList);
      return flowerList;
      }
    }
    console.log(flowerList);
    return productList;
  }

  updateListWithRolls(flowerList, item, address, city){
    for (var _i =0; _i<flowerList.length;_i++){
      if (flowerList[_i].price === item.price){
        if(item.thc_range[0]>flowerList[_i]){
          flowerList[_i]  = {name:item.name, price:item.price, address: storeAddr, city:storeCity, thc:item.thc_range[0]};
          return;
        }


      }

    }

    return;

  }


}
