import React from "react";
import { Route } from "react-router-native";

import { NavigationMenu } from "ezwn-ux-native/app-components/NavigationMenu-cmp";
import { PenFancyTextIcon } from "ezwn-ux-native/text-icons/PenFancyTextIcon-cmp";

import { WriteRoot } from "./roots/WriteRoot-cmp";
import { DumbbellTextIcon } from "ezwn-ux-native/text-icons/DumbbellTextIcon-cmp";
import { TrainingRoot } from "./roots/TrainingRoot-cmp";
import { TestRoot } from "./roots/TestRoot-cmp";

export const id = "ContentTreeFeature";

export const routes = (
  <>
    <Route exact path="/write" component={WriteRoot} />
    <Route exact path="/training" component={TrainingRoot} />
    <Route exact path="/test" component={TestRoot} />
  </>
);

export const navigationMenuItems = (
  <>
    <NavigationMenu.Choice routerPush="/test">
      <DumbbellTextIcon text="Test" />
    </NavigationMenu.Choice>
    <NavigationMenu.Choice routerPush="/training">
      <DumbbellTextIcon text="Training" />
    </NavigationMenu.Choice>
    <NavigationMenu.Choice routerPush="/write">
      <PenFancyTextIcon text="Write" />
    </NavigationMenu.Choice>
  </>
);
