import React from "react";
import { Linking } from "react-native";

import { useSelection } from "shared/selection/Selection-ctx";
import { ContextualMenu } from "ezwn-ux-native/app-components/ContextualMenu-cmp";
import { useResults } from "shared/results/Results-ctx";
import { FontAwesomeTextIcon } from "ezwn-ux-native/text-icons/FontAwsomeTextIcon-cmp";

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
  const { selection } = useSelection();
  const { recordSuccess, recordFailure, findResult } = useResults();

  const date = new Date().toISOString().substring(0, 10);
  const trainingResult = findResult(selection);

  return (
    <>
      {selection && (
        <>
          {trainingResult.date !== date && (
            <>
              <ContextualMenu.Choice onPress={() => recordSuccess(selection)}>
                <FontAwesomeTextIcon
                  fontAwesomeIcon="faThumbsUp"
                  text="Success"
                />
              </ContextualMenu.Choice>
              <ContextualMenu.Choice onPress={() => recordFailure(selection)}>
                <FontAwesomeTextIcon
                  fontAwesomeIcon="faThumbsDown"
                  text="Failure"
                />
              </ContextualMenu.Choice>
            </>
          )}
          <ContextualMenu.Choice onPress={() => openYoutube(selection)}>
            <FontAwesomeTextIcon fontAwesomeIcon="faPenFancy" text="WRITE" />
          </ContextualMenu.Choice>
        </>
      )}
    </>
  );
};
