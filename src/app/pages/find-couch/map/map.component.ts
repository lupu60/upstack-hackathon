import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RestMapService } from 'src/app/api/rest-map.service';
import { SearchMapParam, ApiResponse, User } from 'src/app/shared/api.dto';

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

  constructor(
    private http: HttpClient,
    private notification: NzMessageService,
    private mapApi: RestMapService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.options = {
      center: { lat: 0, lng: 0 },
      zoom: 1
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
    this.addressesSearchUpdate.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(value => {
      if (value) {
        this.goToAddress(value);
      }
    });
  }

  goToAddress(queryAddress) {
    this.http
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${queryAddress}&key=${environment.googleApiKey}`)
      .subscribe((googleResponse: any) => {
        const { results } = googleResponse;
        const [firstResponse] = results;
        const { geometry } = firstResponse;
        const { location } = geometry;
        this.googleMapInstance.setCenter({ lat: location.lat, lng: location.lng });
        this.overlays.push(
          new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            title: firstResponse.address_components[0].short_name,
            animation: google.maps.Animation.DROP
          })
        );
        const bounds = {
          lat_1: geometry.bounds.northeast.lat,
          lng_1: geometry.bounds.northeast.lng,
          lat_2: geometry.bounds.southwest.lat,
          lng_2: geometry.bounds.southwest.lng
        };
        this.searchCouches(bounds);
      });
  }

  getBoundsFromLatLng(lat, lng) {
    const bounds = {
      lat_2: lat - 0.009 * 100,
      lng_2: lng + 0.009 * 100,
      lat_1: lat - 0.009 * 100,
      lng_1: lng + 0.009 * 100
    };
    return bounds;
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
    this.searchCouches(this.getBoundsFromLatLng(this.options.center.lat, this.options.center.lng));
  }

  mapClicked(event) {
    this.searchCouches(this.getBoundsFromLatLng(event.latLng.lat(), event.latLng.lng()));
  }

  userClicked(event) {
    const selectedUser: User = event.overlay.user;
    this.modalService.create({
      nzTitle: `${selectedUser.first_name} ${selectedUser.last_name}`,
      nzWidth: 300,
      nzBodyStyle: {
        'text-align': 'center'
      },
      nzContent: `
      <div nz-row nzType="flex" nzJustify="center" nzAlign="top" style="text-align: center;">
        <img  src="${selectedUser.avatar}"/>
        <br>
        <a href="https://www.google.com/maps/dir/?api=1&origin=${this.position.coords.latitude},${
        this.position.coords.longitude
      }&destination=${Number(selectedUser.locations.latitude)},${Number(
        selectedUser.locations.longitude
      )}" target="_blank"> Get Direction</a>
        <br>
        <a routerLink="messages">Chat with the user </a>
        </div>
      `,
      nzClosable: true,
      nzFooter: []
    });
  }

  searchCouches(bounds: SearchMapParam) {
    const image = {
      url: 'https://couch-surfing.herokuapp.com/assets/brand-logo.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(64, 64),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(32, 64)
    };
    // bounds = { "lat_1": 54.229951, "lng_1": -125.506423, "lat_2": 30.236522, "lng_2": -64.50038 };
    this.mapApi.searchMap(bounds).subscribe((results: ApiResponse) => {
      const userLocation: [] = results.data;
      if (userLocation.length > 0) {
        userLocation.forEach((element: User) => {
          this.overlays.push(
            new google.maps.Marker({
              position: { lat: Number(element.locations.latitude), lng: Number(element.locations.longitude) },
              title: `${element.first_name} ${element.last_name}`,
              animation: google.maps.Animation.DROP,
              user: element
            })
          );
        });
      }
    });
  }
}
