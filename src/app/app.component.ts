import { Component } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular Fire";
  itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  itemValue = "";
  logUpdates = [];
  activeListen = false;
  constructor(public afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection("ServiciosActuales");
  }
  listen() {
    console.log(this.itemValue);
    if (!this.itemValue || this.itemValue.length === 0 || this.activeListen) {
      return;
    }
    this.activeListen = true;
    this.itemsCollection
      .doc(this.itemValue)
      .valueChanges()
      .subscribe(
        e => {
          this.logUpdates.push(e);
          console.log(e);
        },
        err => {
          this.activeListen = false;
          console.log(err);
        }
      );
  }
  reeboot() {
    this.activeListen = false;
    this.logUpdates = [];
  }
}
