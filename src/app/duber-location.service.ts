import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()

export class DuberLocationService{

  constructor(private http: Http){}

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

}
