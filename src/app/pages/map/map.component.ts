import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable, map } from "rxjs";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  trashData: Observable<any> | undefined;
  display: any;
  zoom: number = 12;
  center: google.maps.LatLngLiteral = { lat: 50.9513, lng: 1.8587 };
  fullTrashPosition: google.maps.LatLngLiteral[] = [];
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  mapOptions = {
    restriction: {
      latLngBounds: {
        north: 50.9795,
        south: 50.9418,
        west: 1.8242,
        east: 1.8948,
      },
      strictBounds: true,
    },
  };

  constructor(db: AngularFireDatabase) {
    this.trashData = db.object("trash_1").valueChanges();
  }

  ngOnInit() {
    this.trashData?.subscribe((data) => {
      this.fullTrashPosition = [];
      data.distance < 4 &&
        this.fullTrashPosition.push({
          lat: data.latitude,
          lng: data.longitude,
        });
    });
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
}
