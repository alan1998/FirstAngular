import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ContextMenuModule, MenuItem} from 'primeng/primeng';
import {AccordionModule} from 'primeng/primeng';
import {ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
import { AppComponent } from './app.component';
import { LoadRoundComponent } from './load-round/load-round.component';
import {RoundService} from "./model/round.service";
import { ShotListComponent } from './shot-list/shot-list.component';
import { MapComponent } from './map/map.component';
import {SharedModule} from 'primeng/primeng';

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
    HttpModule,
    ContextMenuModule,
    BrowserAnimationsModule,
    AccordionModule,
    SharedModule,
    ConfirmDialogModule
  ],
  providers: [RoundService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
