import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { MapComponent } from "../pages/map/map.component";
import { PoubellesComponent } from "../pages/poubelles/poubelles.component";
const routes: Routes = [
  { path: "", component: MapComponent },
  { path: "poubelles", component: PoubellesComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
