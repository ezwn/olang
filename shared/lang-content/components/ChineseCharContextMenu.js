import React from "react";
import { Linking } from "react-native";

import { ContextualMenu } from "ezwn-ux-native/app-components/ContextualMenu-cmp";
import { useLangSelection } from "shared/lang-selection/contexts/LangSelection-ctx";
import { PenFancyTextIcon } from "ezwn-ux-native/text-icons/PenFancyTextIcon-cmp";
import { SuccessTextIcon } from "ezwn-ux-native/text-icons/SuccessTextIcon-cmp";
import { FailureTextIcon } from "ezwn-ux-native/text-icons/FailureTextIcon-cmp";
import { useLangContent } from "../contexts/LangContent-ctx";

const openYoutube = (char) => {
  const url = `https://www.youtube.com/results?search_query=write+${encodeURIComponent(
    char
  )}`;

  if (window && window.open) {
    window.open(url, "_blank");
  } else {
    Linking.openURL(url);
  }
};

export const ChineseCharContextMenu = () => {
  const { selection } = useLangSelection();
  const { recordSuccess, recordFailure, findTrainingResult } = useLangContent();

  const date = new Date().toISOString().substring(0, 10);
  const trainingResult = findTrainingResult(selection);

  return (
    <ContextualMenu>
      {selection && (
        <>
          {trainingResult.date !== date && (
            <>
              <ContextualMenu.Choice onPress={() => recordSuccess(selection)}>
                <SuccessTextIcon />
              </ContextualMenu.Choice>
              <ContextualMenu.Choice onPress={() => recordFailure(selection)}>
                <FailureTextIcon />
              </ContextualMenu.Choice>
            </>
          )}
          <ContextualMenu.Choice onPress={() => openYoutube(selection)}>
            <PenFancyTextIcon />
          </ContextualMenu.Choice>
        </>
      )}
    </ContextualMenu>
  );
};
