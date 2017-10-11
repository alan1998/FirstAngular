import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoadRoundComponent } from './load-round/load-round.component';
import {RoundService} from "./model/round.service";
import { ShotListComponent } from './shot-list/shot-list.component';
import { MapComponent } from './map/map.component'

@NgModule({
  declarations: [
    AppComponent,
    LoadRoundComponent,
    ShotListComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [RoundService],
  bootstrap: [AppComponent]
})
export class AppModule { }
