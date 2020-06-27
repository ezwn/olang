import React, { useState, useEffect } from "react";
import { Text, View, Picker, TouchableHighlight } from "react-native";

import { Field } from "ezwn-ux-native/forms/Field-cmp";
import { Button } from "ezwn-ux-native/app-components/Button-cmp";

import { useLangContent } from "shared/lang-content/contexts/LangContent-ctx";

import { ChineseTestProp } from "shared/lang-content/components/ChineseTestProp";
import { useLangSelection } from "shared/lang-selection/contexts/LangSelection-ctx";
import { ClipPath } from "react-native-svg";

export const PropPicker = ({ value, onValueChange }) => {
  const { propositions } = useLangContent();

  if (!value && propositions.length > 0) {
    onValueChange(propositions[0].text);
  }

  const rawIndex = propositions.findIndex((prop) => prop.text === value);
  const index = rawIndex === -1 ? 0 : rawIndex;
  const prop = propositions[index];

  const nextProp =
    index < propositions.length - 1 ? propositions[index + 1].text : null;

  const previousProp = index > 0 ? propositions[index - 1].text : null;

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Button
        enabled={!!previousProp}
        onPress={() => onValueChange(previousProp)}
      >
        <Text>Previous</Text>
      </Button>
      <Text style={{ flex: 1, marginLeft: 25 }}>{prop.reminder}</Text>
      <Button enabled={!!nextProp} onPress={() => onValueChange(nextProp)}>
        <Text>Next</Text>
      </Button>
    </View>
  );
};

export const TestComponent = () => {
  const [prop, setProp] = useState("");
  const { setSelection } = useLangSelection();

  useEffect(() => {
    setSelection(null);
  }, [prop]);

  return (
    <>
      <Field>
        <PropPicker value={prop} onValueChange={setProp} />
      </Field>
      <Field>{prop !== "" && <ChineseTestProp chinese={prop} />}</Field>
    </>
  );
};
