import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()

export class DuberLocationService{

  constructor(private http: Http, private jsonp: Jsonp){}

  getState(zipcode){
    return this.http.get(`http://maps.googleapis.com/maps/api/geocode/json?components=country:US|postal_code:${zipcode}&sensor=true`)
    .toPromise()
    .then(response => this.parseLocation(response.json()));

  }

  parseLocation(response){
    var returnArray;
    var state="";
    var city="";
    var lat="";
    var long="";
    var address_component;

    if (response.results.length > 0){
      address_component = response.results[0].address_components;
      for (let component of address_component){
        var type = component.types[0];
        if (state == "" && type=="administrative_area_level_1") {
          state = component.short_name;
        }
        if (city == "" && type=="locality") {
          city = component.short_name;
        }
      }
      var geoComponents = response.results[0].geometry;
      lat = geoComponents.location.lat;
      long = geoComponents.location.lng;
    }
    returnArray = returnArray= {"state" : state,"city" :city, "lat" : lat, "long" : long};
    return returnArray;

  }

  getStoresByState(state){
    return this.http.get(`https://admin.duberex.com/retailers.json?state=${state}`).toPromise().then(response=> this.parseStores(response.json()));

  }
  parseStores(response){
    var returnArray = [];
    var id;
    var address;
    var city;
    var zipcode;
    var name;


    for (let store of response){
      if(store.address!="Unknown" && store.zip_code!="" && !(store.zip_code === null)){
        id = store.id;
        address = store.address;
        city = store.city;
        zipcode = store.zip_code;
        name = store.name;
        returnArray.push({"id":id,"address":address,"city":city , "zipcode":zipcode, "name": name});
      }
    }

    return returnArray;
  }

  getStoresCloseBy(lat, long, storeList){
    console.log(storeList);
  var destination_query = `${storeList[0].address} , ${storeList[0].city}`;
    for (var _i = 1; _i < storeList.length; _i++){
      destination_query = destination_query + `| ${storeList[_i].address} , ${storeList[_i].city}`;
    }
    var url =  "https://maps.googleapis.com/maps/api/distancematrix/json?";
    let params = new URLSearchParams();
    params.set('units', 'imperial');
    params.set('origins', lat + ',' + long);
    params.set('destinations', destination_query);
    //params.set('key', 'AIzaSyABFzbmnvMJT_r9a7OaHLD7Z5oTeHkvyyo');
    params.set('key', 'AIzaSyDrTazg1rtRSSLzG3xS2FR8APPiOQusMXM');
    params.set('key', 'AIzaSyAgCTw4koEJNM5tc4i3GZyOeH3cyJm3Rgs');
    let headers = new Headers();
    headers.append("Access-Control-Allow-Headers", "Authorization");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append("Access-Control-Allow-Methods", "GET");

    
    /*
    return this.jsonp.get(url,{search:params}).toPromise().then(response=>{
      console.log(response);
      //return this.getStoresinmiles(response,storeList);
    });
    */

    return this.http.get(url, {search:params}).toPromise().then(response=>{

        return this.getStoresinmiles(response.json(),storeList);
    });

  }

  getStoreByZipcode(zipcode, storeList,filterArray){

    for (let store of storeList){
    if(filterArray.length >=25){
      return;
    }

      if (store.zipcode == zipcode){
        filterArray.push(store);
      }
    }
    return;
  }

  getStoreByCity(city, storeList,filterArray){

    for (let store of storeList){
      if(filterArray.length >=25){
        return;
      }
      if (store.city == city){

        filterArray.push(store);
      }
    }
    return;

  }

  getStoresinmiles(response,storeList){
    console.log(response);
    var returnArray = [];

    for (var _i =0; _i < storeList.length; _i++){

      if(returnArray.length >=3){

        return returnArray;
      }


      if (response.rows[0].elements[_i].distance.value < 32187){

        returnArray.push(storeList[_i]);
      }


    }

    return returnArray;

  }

}
