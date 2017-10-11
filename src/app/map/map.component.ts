import { Component, OnInit } from '@angular/core';

import * as ol from '../../../../node_modules/openlayers';
//import * as ol from 'C:/Users/alan/Documents/dev/node_modules/openlayers';
//import Map from 'openlayers/map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
          collapsible: false
        })
      }),
      view: new ol.View({
        center: [0, 0],
        zoom: 2
      })
    });
  }

}
