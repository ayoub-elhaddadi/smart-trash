import { Component } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable } from "rxjs";

@Component({
  selector: "app-poubelles",
  templateUrl: "./poubelles.component.html",
  styleUrls: ["./poubelles.component.css"],
})
export class PoubellesComponent {
  trashData: Observable<any> | undefined;
  trash: any;

  constructor(db: AngularFireDatabase) {
    this.trashData = db.object("trash_1").valueChanges();
  }

  ngOnInit() {
    this.trashData?.subscribe((data) => {
      this.trash = data;
    });
  }
}
