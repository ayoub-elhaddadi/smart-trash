import { Component, OnInit } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
} from "@angular/fire/compat/database";
import { map } from "rxjs";
import { Trash } from "src/app/models";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  private trashRef: AngularFireList<Trash[]>;
  public myTrashs: Trash[] = [];
  display: any;
  zoom: number = 4;
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12,
  };
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  fullTrashPosition: google.maps.LatLngLiteral[] = [];

  constructor(db: AngularFireDatabase) {
    this.trashRef = db.list<Trash[]>("/trash");
  }

  ngOnInit() {
    this.trashRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return { ...c.payload.val() } as Trash;
          })
        )
      )
      .subscribe((data) => {
        this.myTrashs = data;

        const positions: google.maps.LatLngLiteral[] = [];

        this.myTrashs.forEach((t) => {
          const lat = t.latitude;
          const lng = t.longitude;
          if (lat && lng) positions.push({ lat: lat, lng: lng });
        });

        this.fullTrashPosition = positions;
      });
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
}
