import React from "react";

import { Text, View, TouchableHighlight, Linking } from "react-native";
import { cedictFind } from "../../../lib/ezwn-cedict/cedict";
import { useLangSelection } from "shared/lang-selection/contexts/LangSelection-ctx";
import { useLangContent } from "../contexts/LangContent-ctx";
import { ClipPath } from "react-native-svg";

const smallCardViewStyle = {
  width: 45
};

const getDynamicTextStyle = (char) => {
  const { getScoreRank } = useLangContent();
  let style = {};

  const scoreRank = getScoreRank(char);
  if (scoreRank > -1) {
    if (scoreRank <= 5) {
      style = { ...style, color: "red" };
    } else if (scoreRank <= 15) {
      style = { ...style, color: "orange" };
    } else {
      style = { ...style, color: "green" };
    }
  }

  return style;
};

export const ChineseCharSmallCard = ({ char, style }) => {
  const { selection, setSelection } = useLangSelection();
  const pinyin = cedictFind(char).pinyin[0];

  const viewStyle = {
    ...smallCardViewStyle,
    backgroundColor: char === selection ? "lightblue" : "white"
  };

  return (
    <TouchableHighlight
      onPress={() => setSelection(selection === char ? null : char)}
    >
      <View style={viewStyle}>
        <Text
          style={{
            ...getDynamicTextStyle(char),
            ...style,
            fontSize: 40,
            textAlign: "center"
          }}
        >
          {char}
        </Text>
        <Text style={{ ...style, textAlign: "center" }}>{pinyin}</Text>
      </View>
    </TouchableHighlight>
  );
};

ChineseCharSmallCard.defaultProps = {
  style: []
};

export const ChineseReminderSmallCard = ({ char, style }) => {
  const { selection, setSelection } = useLangSelection();

  return (
    <TouchableHighlight
      onPress={() => setSelection(selection === char ? null : char)}
    >
      <View style={smallCardViewStyle}>
        <Text
          style={{
            ...style,
            ...getDynamicTextStyle(char),
            fontSize: 40,
            textAlign: "center"
          }}
        >
          ?
        </Text>
        <Text
          style={{
            ...style,
            ...getDynamicTextStyle(char),
            textAlign: "center"
          }}
        >
          ?
        </Text>
      </View>
    </TouchableHighlight>
  );
};

ChineseCharSmallCard.defaultProps = {
  style: []
};

export const ChineseCharBigCard = ({ char, style }) => {
  const pinyin = cedictFind(char).pinyin[0];
  const {
    trainingResults: { [char]: trainingResult }
  } = useLangContent();

  return (
    <View>
      <Text
        style={{
          ...style,
          ...getDynamicTextStyle(char),
          fontSize: 120,
          textAlign: "center"
        }}
      >
        {char}
      </Text>
      <Text style={{ ...style, textAlign: "center" }}>{pinyin}</Text>
      {trainingResult && (
        <Text style={{ ...style, textAlign: "center" }}>
          Score: {trainingResult.score}
        </Text>
      )}
    </View>
  );
};

ChineseCharBigCard.defaultProps = {
  style: []
};
