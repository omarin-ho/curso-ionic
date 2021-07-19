import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  public lat: number;
  public lng: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let geo = this.route.snapshot.paramMap.get('geo');
    geo = geo.substr(4);
    let geoArray = geo.split(',');
    this.lat = Number(geoArray[0]);
    this.lng = Number(geoArray[1]);
  }
  ngAfterViewInit() {
    this.cargarMapa();
  }

  cargarMapa(){
    mapboxgl.accessToken = 'pk.eyJ1Ijoib21hcmluaG8iLCJhIjoiY2tyNTVsbDk0MzI2bzJvdDlqY2t1cTB1MiJ9.Hre468k1vxBNRVSxmHocpA';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.lng, this.lat],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      antialias: true
    });
    map.on('load',  () => {

      map.resize();

      var marker = new mapboxgl.Marker()
        .setLngLat([this.lng, this.lat])
        .addTo(map);

      var layers = map.getStyle().layers;
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }
      map.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',

            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },

        labelLayerId
      );
    });
  }

}
