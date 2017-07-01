import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { DataService } from './shared/data.service';
import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import TaskWorldComponent from './task-world-component';
import DynamicComponent from './dynamic-component';
// import { HeroSearchComponent }  from './hero-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent, TaskWorldComponent, DynamicComponent
  ],
  providers:[DataService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
