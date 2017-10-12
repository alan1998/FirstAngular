import { Component, OnInit } from '@angular/core';
import { RoundService} from '../model/round.service'
import { GolfShot } from '../model/golf-shot'
import * as ol from '../../../../node_modules/openlayers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map;
  rndSrv:RoundService
  constructor(r:RoundService) {
    this.rndSrv = r;
    this.rndSrv.triggerNewRnd$.subscribe(
      aVal => {
        console.log(aVal);
        this.displayShots();
      });
  }

  displayShots(){
    console.log('map display')
    //Get first log point for map centre (Could do middle of bounding box)
    let firstShot = this.rndSrv.rnd.shots[0];
    let firstPlace = ol.proj.fromLonLat([firstShot.lon,firstShot.lat]);
    
    if(this.map == null){
      this.map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.BingMaps({
              key: 'AoZMNXp87zjIQXWvP83jlfYY7vEid3ObC3vg1I01GGPWpQkf6qmoMjLSEhXiSW1o',
              imagerySet: 'Aerial',
              // use maxZoom 19 to see stretched tiles instead of the BingMaps
              // "no photos at this zoom level" tiles
              maxZoom: 19
            })
          })
        ],
        target: 'map',
        controls: ol.control.defaults({
          attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: false
          })
        }),
        view: new ol.View({
          center: firstPlace,
          zoom: 15
        })
      });
  
    }
    
  }

  ngOnInit() {
  }

}
