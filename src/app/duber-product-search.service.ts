import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class DuberProductSearchService{

  constructor(private http: Http, private jsonp: Jsonp){}


  getProductsFromStore(storeid, budget){
    var duberurl = `
      https://admin.duberex.com/vendors/${storeid}/search.json?auto_off=web_online&categories%5B%5D=Flowers%25&include_subcategory=false&metadata=1&offset=0&order_by=price&sort_order=asc&web_online=true
    `;
    this.http.get(duberurl).toPromise().then(result=>this.organizeFlowerProducts(result.json(),budget));

  }

  organizeFlowerProducts(result, budget){
      console.log(result.products);
      console.log(result.products.items[0].price);

      console.log(result.products.items[0].thc_range[0]);

  }
}
