import React from "react";

import { Text, View, TouchableHighlight, Linking } from "react-native";
import { cedictFind } from "../../../lib/ezwn-cedict/cedict";
import { useSelection } from "shared/selection/Selection-ctx";
import { useResultStyle } from "shared/results/result-hooks";
import { useResults } from "shared/results/Results-ctx";

const smallCardViewStyle = {
  width: 45
};

export const ChineseCharSmallCard = ({ char, style }) => {
  const { selection, setSelection } = useSelection();
  const resultStyle = useResultStyle(char);
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
            ...resultStyle,
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
  const { selection, setSelection } = useSelection();

  return (
    <TouchableHighlight
      onPress={() => setSelection(selection === char ? null : char)}
    >
      <View style={smallCardViewStyle}>
        <Text
          style={{
            ...style,
            ...useResultStyle(char),
            fontSize: 40,
            textAlign: "center"
          }}
        >
          ?
        </Text>
        <Text
          style={{
            ...style,
            ...useResultStyle(char),
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
    results: { [char]: trainingResult }
  } = useResults();

  return (
    <View>
      <Text
        style={{
          ...style,
          ...useResultStyle(char),
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
