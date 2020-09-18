import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { FormdataService } from '../formdata.service';
import { empty, EMPTY } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.css']
})
export class FormDataComponent implements OnInit {
  form: FormGroup;
  skills_array: FormArray;
  invalid_skill: boolean;
  skill_level: { label: string; value: string; }[];
  allcountryopvalueoptions: any []=[];
  allstatedropvalueoptions: any []=[];
  allcitydropvalueoptions: any []=[];
  state_c  = false ;
  city_c: boolean;
  submitted: boolean;
  categories: { label: string; value: string; }[];
  selectedCategories: any[] = [];


  constructor(public fb :FormBuilder, public formdataService : FormdataService,private confirmationService: ConfirmationService) { 
   
  }

  ngOnInit() {
   this.all_counrty_dropdown();
   this.skill_level = [
    {label: 'Beginner', value: "Beginner"},
    {label: 'Intermediate', value: "Intermediate"},
    {label: 'Advanced', value: "Advanced"},
    {label: 'Expert', value: "Expert"},
    ];
    this.categories =[
      {label: 'Mumbai', value: "Mumbai"},
      {label: 'Chennai', value: "Chennai"},
      {label: 'Delhi', value: "Delhi"},
      {label: 'Bangalore', value: "Bangalore"},
    ]
    this.selectedCategories = this.categories.slice(0,1); 
    this.form = this.fb.group({
      'skills_array': new FormArray([this.createitem_skill(1)]),
            'email': new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}")]),
            'name': new FormControl('',[Validators.required,Validators.pattern("^[a-z A-Z]+")]),
            'address':  new FormControl('',Validators.required),
            'country': new FormControl('',Validators.required),
            'state': new FormControl('',Validators.required),
            'city': new FormControl('',Validators.required),
            'exprence':  new FormControl('',Validators.required),
            'yrs_exp':  new FormControl('',null),
            'cities':  new FormControl('',null),
            'sk_name': new FormControl('',null),
            'sk_desc':  new FormControl('',null),
            'sk_level': new FormControl('',null),
          });
        }

        all_counrty_dropdown()  {
          debugger;
          this.formdataService.country_api().subscribe((data) => {
            console.log(data,"block");
            let dropDownList = data;
            debugger;
            if(dropDownList.length>0){
              for(let i=0; i<dropDownList.length;i++){
                this.allcountryopvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].name })
              }
            }
            else
            {
              this.allcountryopvalueoptions.push({ value: "", label: "No Data" })
            } 
          });
        }
        country_id(id){
          this.allstatedropvalueoptions=[];
          this.allcitydropvalueoptions=[];
          let c_id = id.value;
            if (c_id != "" || c_id != undefined){
              this.state_c=true;
            }

          this.formdataService.state_api(c_id).subscribe((data) => {
            console.log(data,"block");
            let dropDownList = data;
            debugger;
            if(dropDownList.length>0){
              for(let i=0; i<dropDownList.length;i++){
                this.allstatedropvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].name })
              }
            }
            else
            {
              this.allstatedropvalueoptions.push({ value: "", label: "No Data" })
            } 
          });
        }
        state_id(id){
          debugger;
          this.allcitydropvalueoptions=[];
          console.log(id,"id");
          let c_id = id.value;
          if (c_id != "" || c_id != undefined){
            this.city_c=true;
          }
          console.log(c_id,"c_id");
          this.formdataService.city_api(c_id).subscribe((data) => {
            console.log(data,"block");
            let dropDownList = data;
            debugger;
            if(dropDownList.length>0){
              for(let i=0; i<dropDownList.length;i++){
                this.allcitydropvalueoptions.push({ value: dropDownList[i].id, label: dropDownList[i].name })
              }
            }
            else
            {
              this.allcitydropvalueoptions.push({ value: "", label: "No Data" })
            } 
          });
        }

        Choose_exprence(value)
        {
          console.log("y",value);
          
        if(value == "Yes")
        {
          this.form.controls['yrs_exp'].setValidators([Validators.required,Validators.pattern("^[0-9]+")]);
        }
        else {
          this.form.controls['yrs_exp'].setValue("");
          this.form.controls['yrs_exp'].setValidators(null);
        }
        this.form.controls['yrs_exp'].updateValueAndValidity();
        }
    createitem_skill(id){
      return this.fb.group({
            id: new FormControl(id, null),
            sk_name: new FormControl('',Validators.required),
            sk_desc:  new FormControl('',Validators.required),
            sk_level : new FormControl('',Validators.required),
          });
    }

    add_skill() {
      this.skills_array = this.form.get('skills_array') as FormArray;
      if (this.skills_array.length < 5) {
        if (this.form.controls.skills_array.valid) {
          this.skills_array.push(this.createitem_skill(this.skills_array.length+1));
        }
        else {
          this.invalid_skill = true;
        }
      }
    }

    remove_skill() {
      console.log(this.skills_array.length,"dinaso");
      if (this.skills_array.length > 1) {
        this.invalid_skill = false;
        const control = <FormArray>this.form.controls['skills_array'];
        control.removeAt(control.length - 1);
      }
    }

    save(){
      this.submitted = true;
      if (this.form.valid) { 
        this.confirmationService.confirm({
          message: 'Are you sure you want to submit the employee data?',
          accept: () => {
            console.log("Submitted Value",this.form.value);          
          }
        });
      }
    }
 
}
