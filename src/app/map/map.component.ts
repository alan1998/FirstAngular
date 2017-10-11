import { Component, OnInit } from '@angular/core';

import * as ol from '../../../../node_modules/openlayers';

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
        center: ol.proj.fromLonLat([-1.1,51.5]),
        zoom: 13
      })
    });
  }

}
