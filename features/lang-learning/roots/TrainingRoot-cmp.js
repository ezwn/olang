import React from "react";

import { VerticalBorderLayout } from "ezwn-ux-native/layouts/VerticalBorderLayout-cmp";
import { TitleBar } from "ezwn-ux-native/app-components/TitleBar-cmp";
import { ContextualMenu } from "ezwn-ux-native/app-components/ContextualMenu-cmp";
import { External } from "ezwn-react-app/External-cmp";
import { ChineseCharBigCard } from "shared/chinese/components/ChineseChar";
import { useSelection } from "shared/selection/Selection-ctx";
import { ChineseCharContextMenu } from "shared/chinese/components/ChineseCharContextMenu";
import { TrainingComponent } from "../components/Training-cmp";

export const TrainingRoot = () => {
  const { selection } = useSelection();

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
      bottom={
        <ContextualMenu>
          <ChineseCharContextMenu />
        </ContextualMenu>
      }
    >
      <TrainingComponent />
      {selection && <ChineseCharBigCard char={selection} />}
    </VerticalBorderLayout>
  );
};
