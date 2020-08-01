import React from "react";
import { ChineseCharSmallCard } from "shared/chinese/components/ChineseChar";
import { View, ScrollView } from "react-native";
import { useResults } from "shared/results/Results-ctx";

export const TrainingComponent = () => {
  const { resultList } = useResults();

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1 }}>
        {resultList.map((tr) => (
          <ChineseCharSmallCard key={tr.char} char={tr.char} />
        ))}
      </View>
    </ScrollView>
  );
};
