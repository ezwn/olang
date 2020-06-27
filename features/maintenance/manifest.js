import React from "react";
import { Route } from "react-router-native";

import { MaintenanceRootView } from "./MaintenanceRootView-cmp";

export const id = "MaintenanceFeature";

export const routes = (
  <Route exact path="/settings" component={MaintenanceRootView} />
);
