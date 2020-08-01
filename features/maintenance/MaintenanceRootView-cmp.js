import React, { useContext, useState } from "react";
import { Text, Button } from "react-native";

import { VerticalBorderLayout } from "ezwn-ux-native/layouts/VerticalBorderLayout-cmp";
import { TitleBar } from "ezwn-ux-native/app-components/TitleBar-cmp";
import { TextInput } from "ezwn-ux-native/forms/TextInput-cmp";

import { useChinese } from "shared/chinese/Chinese-ctx";
import { useResults } from "shared/results/Results-ctx";

export const MaintenanceRootView = () => {
  const { results, setResults } = useResults();
  const { propositions, setPropositions } = useChinese();

  const [text, setText] = useState("");

  function exportData() {
    setText(JSON.stringify({ propositions, results }, undefined, 2));
  }

  function importData() {
    const data = JSON.parse(text);
    setResults(data.results);
    setPropositions(data.propositions);
  }

  return (
    <VerticalBorderLayout
      top={<TitleBar text="Configuration" left={<TitleBar.BackButton />} />}
    >
      <Text>Données personnelles</Text>
      <TextInput multiline height={200} value={text} onChangeText={setText} />
      <Button title="Exporter" onPress={exportData} />
      <Button title="Importer" onPress={importData} />
    </VerticalBorderLayout>
  );
};
