import React, { useContext, useState } from "react";
import { Text, Button } from "react-native";

import { VerticalBorderLayout } from "ezwn-ux-native/layouts/VerticalBorderLayout-cmp";
import { TitleBar } from "ezwn-ux-native/app-components/TitleBar-cmp";
import { TextInput } from "ezwn-ux-native/forms/TextInput-cmp";

import { useLangContent } from "shared/lang-content/contexts/LangContent-ctx";

export const MaintenanceRootView = () => {
  const { propositions, trainingResults, setLangContent } = useLangContent();

  const [text, setText] = useState("");

  function exportData() {
    setText(JSON.stringify({ propositions, trainingResults }, undefined, 2));
  }

  function importData() {
    setLangContent(JSON.parse(text));
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
