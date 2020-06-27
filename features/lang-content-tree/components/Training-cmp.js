import React from "react";
import { useLangContent } from "shared/lang-content/contexts/LangContent-ctx";
import { ChineseCharSmallCard } from "shared/lang-content/components/ChineseChar";
import { View, ScrollView } from "react-native";

export const TrainingComponent = () => {
  const { trainingResultList } = useLangContent();

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1 }}>
        {trainingResultList.map((tr) => (
          <ChineseCharSmallCard key={tr.char} char={tr.char} />
        ))}
      </View>
    </ScrollView>
  );
};
