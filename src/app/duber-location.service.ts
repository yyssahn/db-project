import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams } from '@angular/http';
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
    for (let store of response){
      if(store.address!="Unknown" && store.zip_code!="" && !(store.zip_code === null)){
        id = store.id;
        address = store.address;
        city = store.city;
        zipcode = store.zip_code;
        returnArray.push({"id":id,"address":address,"city":city , "zipcode":zipcode});
      }
    }

    return returnArray;
  }

  getStoresCloseBy(lat, long,  city,zipcode, storeList){
    var filterArray= [];

    this.getStoreByZipcode(zipcode, storeList, filterArray);
    this.getStoreByCity(city, storeList, filterArray);

    var destination_query = `${filterArray[0].address} , ${filterArray[0].city}`;
    for (var _i = 1; _i < filterArray.length; _i++){
      destination_query = destination_query + `| ${filterArray[_i].address} , ${filterArray[_i].city}`;
    }
    var url =  "https://maps.googleapis.com/maps/api/distancematrix/json?";

    let params = new URLSearchParams();
    params.set('units', 'imperial');
    params.set('origins', lat + ',' + long);
    params.set('destinations', destination_query);
    params.set('key', 'AIzaSyABFzbmnvMJT_r9a7OaHLD7Z5oTeHkvyyo');
    return this.http.get(url, {search:params}).toPromise().then(response=>this.getStoresinmiles(response.json(),filterArray));
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
