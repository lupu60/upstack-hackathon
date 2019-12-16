import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RestMapService } from 'src/app/api/rest-map.service';
import { SearchMapParam, ApiResponse, User } from 'src/app/shared/api.dto';
import { RestMessages } from 'src/app/api/rest-messeges.service';

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
  overlays = [];
  addressesSearchUpdate = new Subject<string>();
  googleMapInstance: any;

  @Output()
  chatSelected = new EventEmitter();

  constructor(
    private http: HttpClient,
    private notification: NzMessageService,
    private mapApi: RestMapService,
    private modalService: NzModalService,
    private restMessages: RestMessages
  ) {}

  ngOnInit() {
    this.options = {
      center: { lat: 0, lng: 0 },
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
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
        const bounds = {
          lat_1: geometry.bounds.northeast.lat,
          lng_1: geometry.bounds.northeast.lng,
          lat_2: geometry.bounds.southwest.lat,
          lng_2: geometry.bounds.southwest.lng
        };
        this.searchCouches(bounds);
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
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(this.overlays[0].getPosition());

    // {
    //   lat_1: 45.72210200000001
    // lng_1: 25.6784767
    // lat_2: 45.5828542
    //   lng_2: 25.5144489
    // }

    const searchBounds: SearchMapParam = {
      lat_1: bounds.pa.h,
      lng_1: bounds.pa.g,
      lat_2: bounds.ka.h,
      lng_2: bounds.ka.g
    };
    this.searchCouches(searchBounds);
  }

  onZoomChanged(event) {
    // const mapBounds = this.googleMapInstance.getBounds();
    // const bounds: SearchMapParam = {
    //   lat_1: mapBounds.pa.g,
    //   lng_1: mapBounds.pa.h,
    //   lat_2: mapBounds.ka.g,
    //   lng_2: mapBounds.ka.h
    // };
    // this.searchCouches(bounds);
  }

  mapClicked(event) {
    // const mapBounds = this.googleMapInstance.getBounds();
    // const bounds: SearchMapParam = {
    //   lat_1: mapBounds.pa.g,
    //   lng_1: mapBounds.pa.h,
    //   lat_2: mapBounds.ka.g,
    //   lng_2: mapBounds.ka.h
    // };
    // this.searchCouches(bounds);
  }

  userClicked(event) {
    const selectedUser: User = event.overlay.user;
    const modal: NzModalRef = this.modalService.create({
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
        </div>
      `,
      nzClosable: true,
      nzFooter: [
        {
          label: 'Close',
          shape: 'default',
          onClick: () => modal.destroy()
        },
        {
          label: `Chat with ${selectedUser.first_name}`,
          type: 'primary',
          onClick: () => {
            modal.destroy();
            this.sendMessage(selectedUser);
          }
        }
      ]
    });
  }

  sendMessage(value) {
    this.restMessages.sendMessage({ uid: value.uid, body: `Hey!` }).subscribe();
    this.chatSelected.emit(value);
  }

  searchCouches(bounds: SearchMapParam) {
    this.mapApi.searchMap(bounds).subscribe((results: ApiResponse) => {
      const userLocation: [] = results.data;
      if (userLocation.length > 0) {
        this.overlays = [this.overlays[0]];
        const newMarkers = userLocation.forEach((user: User) => {
          this.overlays.push(
            new google.maps.Marker({
              position: { lat: Number(user.locations.latitude), lng: Number(user.locations.longitude) },
              title: `${user.first_name} ${user.last_name}`,
              animation: google.maps.Animation.DROP,
              user
            })
          );
        });
      }
    });
  }
}
