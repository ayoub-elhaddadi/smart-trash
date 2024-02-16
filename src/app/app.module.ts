import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";

import { AppComponent } from "./app.component";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideDatabase, getDatabase } from "@angular/fire/database";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { MapComponent } from "./pages/map/map.component";
import { RoutingModule } from "./routes/route.module";
import { GoogleMapsModule } from "@angular/google-maps";
import { PoubellesComponent } from "./pages/poubelles/poubelles.component";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MapComponent,
    PoubellesComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    GoogleMapsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
