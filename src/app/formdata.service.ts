import { Injectable } from '@angular/core';
import { DataService } from 'src/service/data.service';


@Injectable({
  providedIn: 'root'
})
export class FormdataService {

  constructor(private dataService: DataService) { }

  country_api(){
    debugger;
    return this.dataService.getData('/api/test/countries',true);
  }

  state_api (id){
    debugger;
    return this.dataService.getData('/api/test/states/' + id ,true);
  }

  city_api (id){
    debugger;
    return this.dataService.getData('/api/test/cities/' + id ,true);
  }
}
