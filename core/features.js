import React from "react";

import * as LangContentTreeFeature from "features/lang-learning/manifest";
import * as MaintenanceFeature from "features/maintenance/manifest";

import { ChineseProvider } from "shared/chinese/Chinese-ctx";
import { SelectionProvider } from "shared/selection/Selection-ctx";
import { ResultsProvider } from "shared/results/Results-ctx";

export const features = [LangContentTreeFeature, MaintenanceFeature];

export const GlobalProvider = ({ children }) => (
  <ResultsProvider>
    <SelectionProvider>
      <ChineseProvider>{children}</ChineseProvider>
    </SelectionProvider>
  </ResultsProvider>
);
