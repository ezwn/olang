import React from "react";
import { View } from "react-native";

import { ChineseReminderSmallCard, ChineseCharSmallCard } from "./ChineseChar";
import { useLangContent } from "../contexts/LangContent-ctx";

export const ChineseTestProp = ({ chinese }) => {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {chinese
        .split("")
        .filter((char) => char !== " ")
        .map((char, i) => (
          <ChineseTestSmallCard key={i} char={char} />
        ))}
    </View>
  );
};

export const ChineseTestSmallCard = ({ char, style }) => {
  const { getScoreRank } = useLangContent();
  const scoreRank = getScoreRank(char);

  return scoreRank === -1 || scoreRank > 15 ? (
    <ChineseCharSmallCard char={char} />
  ) : (
    <ChineseReminderSmallCard char={char} />
  );
};
