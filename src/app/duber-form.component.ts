import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DuberLocationService } from './duber-location.service'

@Component({
  selector:'db-form',
  templateUrl: './duber-form.component.html',
  styleUrls: ['./duber-form.component.css']
})


export class DuberFormComponent {
  duberForm;
  city;
  state;
  lat;
  long;
  zipcode;
  storeList;
  closeStoreList;
  oldLat;
  oldLong;
  filteredStoreList;
  oldFilteredStoreList;
  budget;
  dummyCloseStoreList = [
  { address:"15029 Aurora Ave N", city:"Shoreline",id:"c66d4e8c-3afd-6734-5661-bb7dbfd72f48",zipcode:"98133"},
  {address:"12001 Aurora Ave N", city: "Seattle" , id:"5f198700-ef9c-a3e2-57b6-0f6a7c829b63", zipcode:"98133"},
  {address:"12230 Aurora Ave North",city:"Seattle",id:"4518b723-f46b-44bc-92e7-4724bef6fa34",zipcode:98133}
  ];

  constructor(private formBuilder: FormBuilder,
  private duberLocationService : DuberLocationService){
  }

  ngOnInit(){
    this.city="";
    this.state = "";
    this.lat = "";
    this.zipcode = "";
    this.duberForm = this.formBuilder.group({
      zipcode: this.formBuilder.control('',Validators.compose([
      Validators.required,
      Validators.pattern('\\d{5}'),

      ])),
      budget: this.formBuilder.control('50',Validators.compose([
      Validators.required,
      Validators.pattern('[\\d]+')
      ]))
    });


  }


    ngDoCheck(){

      if(this.lat!==this.oldLat && this.long !==this.oldLong){

        this.oldLat = this.lat;
        this.oldLong = this.long;
        this.duberLocationService.getStoresByState(this.state).then(result=>   {
        this.storeList = result;
        this.filteredStoreList = [];
        this.duberLocationService.getStoreByZipcode(this.zipcode, this.storeList, this.filteredStoreList);
        this.duberLocationService.getStoreByCity(this.city, this.storeList, this.filteredStoreList);
        });
      }
      if(this.storeList && this.filteredStoreList!=this.oldFilteredStoreList){
        this.oldFilteredStoreList = this.filteredStoreList;
        console.log(this.filteredStoreList);
        this.storeList = null;
        this.duberLocationService.getStoresCloseBy(this.lat,this.long, this.filteredStoreList).then(result=> {
          this.closeStoreList = result;
          console.log(result);
        });
      }

    }


  onSubmit(value){
    this.budget = value.budget;
      this.duberLocationService.getState(value.zipcode).then(result=>{

        this.zipcode = value.zipcode;
        this.city = result.city;
        this.state = result.state;
        this.lat = result.lat;
        this.long = result.long;
        });

  }

}
