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
  vectorSourceShots; //Layer with shots in

  constructor(r:RoundService) {
    this.rndSrv = r;
    this.rndSrv.triggerNewRnd$.subscribe(
      aVal => {
        console.log(aVal);
        this.displayShots(aVal.toString());
      });
      
  }

  createShotStyle(n:number){
    let shotStyle = new ol.style.Style({
      image: new ol.style.Circle({
        radius:5,
        fill: new ol.style.Fill({color: 'rgba(0, 255, 0, 0.4)'}),
        stroke: new ol.style.Stroke({color: 'Red', width: 1})
      }),
      text: new ol.style.Text({
        text:n.toString()
      })  
    });
    return shotStyle;
  }

  displayShots(hint:string){
    console.log('map display' )
    //Get first log point for map centre (Could do middle of bounding box)
    let firstShot = this.rndSrv.rnd.shots[0];
    let firstPlace = ol.proj.fromLonLat([firstShot.lon,firstShot.lat]);
    if(hint == "update")
      this.vectorSourceShots.clear({fast:true});

    if(this.map == null){
      this.vectorSourceShots = new ol.source.Vector({wrapX: false});
      let vectorLayer = new ol.layer.Vector({
        source: this.vectorSourceShots
      });
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
          }),
          vectorLayer
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
    // Loop over shots. Feature for each and id = shot number
    for(let n=0; n < this.rndSrv.rnd.shots.length; n++){
      let cent = ol.proj.fromLonLat([this.rndSrv.rnd.shots[n].lon, this.rndSrv.rnd.shots[n].lat]);
      let feature = new ol.Feature({
        geometry: new ol.geom.Point(cent),
        labelPoint: new ol.geom.Point(cent),
        name: (n+1).toString()
      });
      feature.setId(n+1);
      feature.setStyle(this.createShotStyle(n+1));
      this.vectorSourceShots.addFeature(feature);
    }
    
  }

  ngOnInit() {
  }

}
