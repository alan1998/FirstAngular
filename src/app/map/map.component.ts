import { Component, OnInit } from '@angular/core';
import { RoundService} from '../model/round.service'
import { GolfShot } from '../model/golf-shot'
import * as ol from '../../../../node_modules/openlayers';
import {ContextMenuModule,MenuItem} from 'primeng/primeng';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map;
  rndSrv:RoundService;
  vectorSourceShots; //Layer with shots in
  modifyShots; // Interaction from vector layer
  private items: MenuItem[];
  editShots: number[];
  eSpread:number;
  eDelete:number;
  eInsert:number;
  //confirmationService: ConfirmationService;

  constructor(r:RoundService, private confirmationService: ConfirmationService) {
    //this.confirmationService = confSrv;
    this.rndSrv = r;
    this.rndSrv.triggerNewRnd$.subscribe(
      aVal => {
        console.log("New round trigger : " +aVal);
        this.displayShots(aVal.toString());
      });
  }

  ngOnInit() {
    this.items = [
      {label: 'Spread',disabled:false, command: (event) => {this.spread();}},
      {label: 'Delete',disabled:true, command: (event) => {this.deleteShot();}},
      {label: 'Insert',disabled:true, command: (event) => {this.insertShot();}}
    ];
    //Todo enums?  Programtically do this this
    this.eSpread=0;
    this.eDelete = 1;
    this.eInsert =2;
  }

  confirmDel(numShot:number) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete this shot?',
        header: 'Confirm delete',
        icon: 'fa fa-trash',
        accept: () => {
          this.rndSrv.deleteShot(numShot);
        },
        reject: () => {
            //Do nothing
        }
    });
}

  createShotStyle(n:number){
    let shot = this.rndSrv.getShot(n);
    let dispNum:string =  shot.numOnHole.toString();
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
    console.log('Enter map  displayShots' )
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
 //     console.log(n+' '+ this.rndSrv.rnd.shots[n].getHole())
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
    console.log('Exit map  displayShots' )
  }

  onModifyend(evt){
    let c = evt.mapBrowserEvent.coordinate;
    //console.log(evt)
    let newPos = ol.proj.toLonLat(c);
    //Itterate features and find all that have moved.
    let fs = this.vectorSourceShots.getFeatures();
    let n=0;
    let shotNum;
    for(n=0; n < fs.length; n++){
      let id = fs[n].getId();
      let c = fs[n].getGeometry().getFirstCoordinate();
      let p = ol.proj.toLonLat(c);
      shotNum = parseInt(id)
      let shot = this.rndSrv.getShot(shotNum);
      if(!shot.hasSameLocation(p[0],p[1])){
        shot.lat = newPos[1];
        shot.lon = newPos[0];
        this.rndSrv.movedShot(shotNum);
        console.log("ModEnd id/Num:" + id + " hole:" + shot.getHole() + " num:" + shot.numOnHole)
      }
    }
  }

  MenuHandler(e){
    // Enable items based on zoom level and features at pixel
    let z = this.map.getView().getZoom();
    let p = [e.layerX, e.layerY];
    let feats = this.map.getFeaturesAtPixel(p)
    // Features always seem to have 1 undefined
    if(feats != null &&   (feats.length-1)> 0){
      this.editShots = new Array<number>(feats.length-1)
      for(let n=1; n < feats.length; n++){
        this.editShots[n-1] = feats[n].getId();
      }
    }
    this.items[this.eDelete].disabled = true;
    this.items[this.eInsert].disabled =true;
    if(( z > 19) && (feats != null) && (feats.length >2)){
      this.items[this.eSpread].disabled = false; // Zoom high enough and more than 1 shot at pixel
    }
    else{
      this.items[this.eSpread].disabled = true;
      if(this.editShots.length==1){
        this.items[this.eDelete].disabled = false;
        this.items[this.eInsert].disabled = false;
      }
    }
  }

  spread(){
    // Reposition shots and modify geometry of associated features
    // First feature in array is bogus
    this.rndSrv.spreadShots(this.editShots);
    let lay = this.vectorSourceShots;
    let feats = lay.getFeatures();

    for(let nF=1; nF < feats.length; nF++){
      let numShot = feats[nF].getId();
      for(let n=0; n < this.editShots.length; n++){
        if(this.editShots[n] == numShot){
          let cent = ol.proj.fromLonLat([this.rndSrv.rnd.shots[numShot-1].lon, this.rndSrv.rnd.shots[numShot-1].lat]);
          let geo = new ol.geom.Point(cent)
          feats[nF].setGeometry(geo);
        }
      }
    }
  }
  insertShot(){
    if(this.editShots.length == 1){
      this.rndSrv.insertShot(this.editShots[0]);
    }
  }
  deleteShot(){
    if(this.editShots.length == 1){
      this.confirmDel(this.editShots[0]);
    }
  }
}
