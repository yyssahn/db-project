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
      }
      var geoComponents = response.results[0].geometry;
      lat = geoComponents.location.lat;
      long = geoComponents.location.lng;
    }
    returnArray = returnArray= {"state" : state, "lat" : lat, "long" : long};
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
    for (let store of response){
      id = store.id;
      address = store.address;
      city = store.city;
      returnArray.push({"id":id,"address":address,"city":city});
    }
    return returnArray;
  }

  getStoresCloseBy(lat, long, storeList){
    var destination_query = storeList[0].address + "," + storeList[0].city;
    console.log(destination_query);
    for (var _i = 1; _i < 10; _i++){
      destination_query = destination_query + "|" + storeList[_i].address + "," + storeList[_i].city;
    }
    console.log(destination_query);
    var query = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=47.7393027,-122.3435336&destinations=5809%20112TH%20ST%20E%20BLDG%20B,PUYALLUP|5809%20112TH%20ST%20E%20BLDG%20B,PUYALLUP|5200%20172ND%20ST%20NE%20F-101,ARLINGTON|3005%20NORTHVIEW%20CIRCLE,SHELTON|4264%20PACIFIC%20HWY,BELLINGHAM|2018%20IRON%20ST%20STE%20A,BELLINGHAM|1615%20BASIN%20ST%20SW,EPHRATA|5655%20GUIDE%20MERIDIAN%20STE%20A,BELLINGHAM|3598%20BETHEL%20RD%20SE,PORT%20ORCHARD|18729%20FIR%20ISLAND%20RD%20STE%20C,MOUNT%20VERNON|17517%2015th%20Ave%20NE%20#202,Shoreline&key=AIzaSyABFzbmnvMJT_r9a7OaHLD7Z5oTeHkvyyo';
    let params = new URLSearchParams();
    params.set('units', 'imperial');
    params.set('origins', lat + ',' + long);
    params.set('destinations', destination_query);
    params.set('key', 'AIzaSyABFzbmnvMJT_r9a7OaHLD7Z5oTeHkvyyo');
    //return this.jsonp.get('https://maps.googleapis.com/maps/api/distancematrix/json', { search: params }).map(response => response);
  }




}
