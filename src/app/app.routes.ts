import { Routes } from "@angular/router";
import { AuthService } from "./services/auth/auth.service";

export const ROUTES: Routes = [
  {
    path: "",
    redirectTo: "create-cases",
    pathMatch: "full"
  },
  {
    path: "create-cases",
    canActivate: [AuthService],
    loadChildren: "../cases/cases.module#CasesModule"
  },
  {
    path: "**",
    redirectTo: "/create-cases",
    pathMatch: "full"
  }
];
