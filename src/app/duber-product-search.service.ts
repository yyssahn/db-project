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
      flowerList = this.organizeFlowerProducts(result.json(),location, location.city,budget);
      return this.http.get(prerollurl).toPromise().then(result=>{
        return this.organizePreRollProducts(result.json(), location, location.city, budget, flowerList) as Product[];
      });
    });

  }

  organizeFlowerProducts(result, address, city,budget){
      var productList = [];
      console.log(result);
      for (let item of result.products.items){
        if (item.price<=budget){
          //productList.push(item);
          this.pushtoList(productList, item, address, city);
        }else{

          return productList;
        }
      }
      return productList;
  }


  pushtoList(productList,product, storeAddr,storeCity){
    var length = productList.length;
    if (length ===0 ){
      productList.push({name:product.name, price:product.price, address: storeAddr, city:storeCity, thc:product.thc_range[0],thc_value : (product.thc_range[0] / product.price) });
    }else{
      if (product.price === productList[length-1].price){
        if(product.thc_range[0]>productList[length-1].thc){
          productList[length-1] = {name:product.name, price:product.price, address: storeAddr, city:storeCity, thc:product.thc_range[0], thc_value : (product.thc_range[0] / product.price) };
        }
      }else{
        productList.push({name:product.name, price:product.price, address: storeAddr, city:storeCity, thc:product.thc_range[0] , thc_value : (product.thc_range[0] / product.price) });
      }
    }

  }

  organizePreRollProducts(result, address, city, budget, flowerList){
    for (let item of result.products.items){
      if (item.price<=budget){
        this.updateListWithRolls(flowerList, item, address, city);
      }else{

      return flowerList;
      }
    }

    return flowerList;
  }

  updateListWithRolls(flowerList, item, storeAddr, storeCity){
    if (flowerList[0].price > item.price){
      flowerList.splice(0,0,{name:item.name, price:item.price, address: storeAddr, city:storeCity, thc:item.thc_range[0], thc_value : (item.thc_range[0] / item.price) });
      return;
    }
    if (flowerList[flowerList.length -1].price < item.price){

      flowerList.push({name:item.name, price:item.price, address: storeAddr, city:storeCity, thc:item.thc_range[0], thc_value : (item.thc_range[0] / item.price) });
    }
    for (var _i =0; _i<flowerList.length;_i++){

      if (flowerList[_i].price === item.price){
        if(item.thc_range[0]>flowerList[_i].thc){

          flowerList[_i]  = {name:item.name, price:item.price, address: storeAddr, city:storeCity, thc:item.thc_range[0], thc_value : (item.thc_range[0] / item.price) };
          return;
        }


      }
      if(_i < flowerList.length-1) {
        if (item.price>flowerList[_i].price && flowerList[_i+1].price>item.price){

          flowerList.splice(_i+1, 0, {name:item.name, price:item.price, address: storeAddr, city:storeCity, thc:item.thc_range[0],thc_value : (item.thc_range[0] / item.price)});
          return;
        }
      }

    }

    return;

  }


}
