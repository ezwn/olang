import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

import { useLangContent } from "shared/lang-content/contexts/LangContent-ctx";
import { TextInput } from "ezwn-ux-native/forms/TextInput-cmp";
import { Field } from "ezwn-ux-native/forms/Field-cmp";
import { Button } from "ezwn-ux-native/app-components/Button-cmp";

import { ChineseProp } from "../../../shared/lang-content/components/ChineseProp";
import { useLangSelection } from "shared/lang-selection/contexts/LangSelection-ctx";

export const WriteChineseComponent = () => {
  const { studyProp } = useLangContent();
  const [chinese, setChinese] = useState("");
  const [reminder, setReminder] = useState("");
  const { setSelection } = useLangSelection();

  useEffect(() => {
    setSelection(null);
  }, [chinese]);

  return (
    <>
      <Field>
        <TextInput value={chinese} onChangeText={setChinese} />
      </Field>
      <Field>
        <ChineseProp chinese={chinese} />
      </Field>
      <Field>
        <Text>Reminder:</Text>
        <TextInput value={reminder} onChangeText={setReminder} />
        <Button onPress={() => studyProp(chinese, reminder)}>
          <Text>Study</Text>
        </Button>
      </Field>
    </>
  );
};
