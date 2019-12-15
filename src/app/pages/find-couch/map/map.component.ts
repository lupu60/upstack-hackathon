import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  loading = true;
  options: any;
  position;
  infoWindow: any;
  overlays: any[] = [];
  addressesSearchUpdate = new Subject<string>();
  googleMapInstance: any;

  constructor(private http: HttpClient, private notification: NzMessageService) {}

  ngOnInit() {
    this.options = {
      center: { lat: 0, lng: 0 },
      zoom: 12
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.position = position;
        this.options.center.lat = position.coords.latitude;
        this.options.center.lng = position.coords.longitude;
        this.loading = false;
        this.initOverlays();
      });
    } else {
      this.notification.create(`error`, `Could not use device position`);
    }

    this.infoWindow = new google.maps.InfoWindow();

    this.addressesSearchUpdate.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      if (value) {
        this.http
          .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${environment.googleApiKey}`)
          .subscribe((googleResponse: any) => {
            const { results } = googleResponse;
            const [firstResponse] = results;
            const { geometry } = firstResponse;
            const { location } = geometry;
            this.googleMapInstance.setCenter({ lat: location.lat, lng: location.lng });
          });
      }
    });
  }

  initOverlays() {
    const image = {
      url: 'https://img.icons8.com/dusk/50/000000/marker.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(64, 64),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(32, 64)
    };

    if (!this.overlays || !this.overlays.length) {
      this.overlays.push(
        new google.maps.Marker({
          position: { lat: this.options.center.lat, lng: this.options.center.lng },
          icon: image,
          title: 'You are here!!',
          animation: google.maps.Animation.DROP
        })
      );
    }
  }

  handleOverlayClick(event) {
    const isMarker = event.overlay.getTitle !== undefined;
    if (isMarker) {
      const title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());
    }
  }

  setMapInstance(event) {
    this.googleMapInstance = event.map;
  }
}
