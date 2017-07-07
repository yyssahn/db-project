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
  state;
  lat;
  long;
  constructor(private formBuilder: FormBuilder,
  private duberLocationService : DuberLocationService){
  }

  ngOnInit(){
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


  onSubmit(value){
    console.log("submit button pressed");
    console.log(value);
    this.duberLocationService.getState(value.zipcode).then(result=>{
      this.state = result.state;
      this.lat = result.lat;
      this.long = result.long;
    });


  }

}
