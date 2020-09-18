import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {PanelModule} from 'primeng/panel';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormDataComponent } from './form-data/form-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormdataService } from './formdata.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';




@NgModule({
  declarations: [
    AppComponent,
    FormDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    PanelModule,
    RadioButtonModule, 
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FormdataService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
