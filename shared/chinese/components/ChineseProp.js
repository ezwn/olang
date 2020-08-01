import React from "react";
import { View } from "react-native";

import { ChineseCharSmallCard } from "./ChineseChar";

export const ChineseProp = ({ chinese }) => {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {chinese
        .split("")
        .filter((c) => c !== " ")
        .map((c, i) => (
          <ChineseCharSmallCard key={i} char={c} />
        ))}
    </View>
  );
};
