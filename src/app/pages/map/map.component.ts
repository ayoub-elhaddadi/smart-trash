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
      .subscribe((data) => (this.myTrashs = data));
  }
}
