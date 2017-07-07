import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { NgxMyFormModule } from 'ngx-myform';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Demo1Component } from './demo1/demo1.component';
import { Demo2Component } from './demo2/demo2.component';

@NgModule({
  declarations: [
    AppComponent,
    Demo1Component,
    Demo2Component,
  ],
  imports: [
    BrowserModule,
    NgxMyFormModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
