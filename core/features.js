import React from "react";

import * as LangContentTreeFeature from "features/lang-content-tree/manifest";
import * as MaintenanceFeature from "features/maintenance/manifest";

import { LangContentProvider } from "shared/lang-content/contexts/LangContent-ctx";
import { LangUserProvider } from "shared/lang-selection/contexts/LangSelection-ctx";

export const features = [LangContentTreeFeature, MaintenanceFeature];

export const GlobalProvider = ({ children }) => (
  <LangUserProvider>
    <LangContentProvider>{children}</LangContentProvider>
  </LangUserProvider>
);
