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
  modifyShots; // Interaction from vector layer


  constructor(r:RoundService) {
    this.rndSrv = r;
    this.rndSrv.triggerNewRnd$.subscribe(
      aVal => {
        console.log(aVal);
        this.displayShots(aVal.toString());
      });

  }

  createShotStyle(n:number){
    let dispNum = this.rndSrv.getDisplayNumber(n);
    let shotStyle = new ol.style.Style({
      image: new ol.style.Circle({
        radius:6,
        fill: new ol.style.Fill({color: 'rgba(0, 255, 0, 0.5)'}),
        stroke: new ol.style.Stroke({color: 'Green', width: 1})
      }),
      text: new ol.style.Text({
        text:dispNum,
        textAlign:'left',
        textBaseline: 'bottom',
        fill: new ol.style.Fill({color: 'Black'}),
        stroke: new ol.style.Stroke({color: 'rgba(255, 255, 255, 0.5)', width: 2}),
        font:'normal 14px Arial ',
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
      this.modifyShots = new ol.interaction.Modify({
          source: this.vectorSourceShots});
      this.map.addInteraction(this.modifyShots);
       this.modifyShots.on('modifyend', (evt) =>{
          this.onModifyend(evt)
        });
      this.map.on('pointermove',  (e) => {
        if (e.dragging) 
          return;
        let pixel = this.map.getEventPixel(e.originalEvent);
        let hit = this.map.hasFeatureAtPixel(pixel);
        this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
      });
    }
    // Loop over shots. Feature for each and id = shot number
    for(let n=0; n < this.rndSrv.rnd.shots.length; n++){
      console.log(n+' '+ this.rndSrv.rnd.shots[n].hole)
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

  onModifyend(evt){
    let c = evt.mapBrowserEvent.coordinate;
    let newPos = ol.proj.toLonLat(c);
    //Itterate features and find first that has moved.
    let fs = this.vectorSourceShots.getFeatures();
    let n=0;
    let bFound = false;
    let shotNum;
    for(n=0; n < fs.length; n++){
      let id = fs[n].getId();
      let c = fs[n].getGeometry().getFirstCoordinate();
      let p = ol.proj.toLonLat(c);
      shotNum = parseInt(id)
      let shot = this.rndSrv.getShot(shotNum);
      if(!shot.hasSameLocation(p[0],p[1])){
        bFound = true;
        shot.lat = newPos[1];
        shot.lon = newPos[0];
        break;
      }
    }
    if(bFound){
      this.rndSrv.movedShot(shotNum);
    }
    
    //Recalculate distance for it and previous (add a shot moved method to round and rndService)
  }

  ngOnInit() {
  }

}
