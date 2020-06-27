import React from "react";

import { VerticalBorderLayout } from "ezwn-ux-native/layouts/VerticalBorderLayout-cmp";
import { TitleBar } from "ezwn-ux-native/app-components/TitleBar-cmp";
import { External } from "ezwn-react-app/External-cmp";
import { ChineseCharBigCard } from "shared/lang-content/components/ChineseChar";
import { useLangSelection } from "shared/lang-selection/contexts/LangSelection-ctx";
import { ChineseCharContextMenu } from "shared/lang-content/components/ChineseCharContextMenu";
import { TrainingComponent } from "../components/Training-cmp";

export const TrainingRoot = () => {
  const { selection } = useLangSelection();

  return (
    <VerticalBorderLayout
      top={
        <TitleBar
          left={
            <External feature="MaintenanceFeature">
              <TitleBar.SettingsButton />
            </External>
          }
          text="Training"
        />
      }
      bottom={<ChineseCharContextMenu />}
    >
      <TrainingComponent />
      {selection && <ChineseCharBigCard char={selection} />}
    </VerticalBorderLayout>
  );
};
