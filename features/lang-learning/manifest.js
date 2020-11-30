import React from "react";
import { Route } from "react-router-native";

import { NavigationMenu } from "ezwn-ux-native/app-components/NavigationMenu-cmp";

import { WriteRoot } from "./roots/WriteRoot-cmp";
import { TrainingRoot } from "./roots/TrainingRoot-cmp";
import { TestRoot } from "./roots/TestRoot-cmp";
import { FontAwesomeTextIcon } from "ezwn-ux-native/text-icons/FontAwsomeTextIcon-cmp";

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
      <FontAwesomeTextIcon text="Test" fontAwesomeIcon="faDumbbell" />
    </NavigationMenu.Choice>
    <NavigationMenu.Choice routerPush="/training">
      <FontAwesomeTextIcon text="Training" fontAwesomeIcon="faDumbbell" />
    </NavigationMenu.Choice>
    <NavigationMenu.Choice routerPush="/write">
      <FontAwesomeTextIcon text="Write" fontAwesomeIcon="faPenFancy" />
    </NavigationMenu.Choice>
  </>
);
