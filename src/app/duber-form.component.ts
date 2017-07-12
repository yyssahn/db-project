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
  oldStoreList;
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
      this.duberLocationService.getStoresByState(this.state).then(result=>   this.storeList = result);
      this.oldLat = this.lat;
      this.oldLong = this.long;
    }
    if(this.storeList){
      this.duberLocationService.getStoresCloseBy(this.lat,this.long, this.city,this.zipcode, this.storeList).then(result=> {
      this.closeStoreList = result
      this.storeList = null;
      });
    }
  }
  onSubmit(value){
      this.duberLocationService.getState(value.zipcode).then(result=>{
        
        this.zipcode = value.zipcode;
        this.city = result.city;
        this.state = result.state;
        this.lat = result.lat;
        this.long = result.long;
        });

  }

}
