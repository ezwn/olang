import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

import { useChinese } from "shared/chinese/Chinese-ctx";
import { TextInput } from "ezwn-ux-native/forms/TextInput-cmp";
import { Field } from "ezwn-ux-native/forms/Field-cmp";
import { Button } from "ezwn-ux-native/app-components/Button-cmp";

import { ChineseProp } from "../../../shared/chinese/components/ChineseProp";
import { useSelection } from "shared/selection/Selection-ctx";
import { cedictFind } from "shared/ezwn-cedict/cedict";

export const WriteChineseComponent = () => {
  const { studyProp } = useChinese();
  const [chinese, setChinese] = useState("");
  const [reminder, setReminder] = useState("");
  const { setSelection } = useSelection();

  useEffect(() => {
    setSelection(null);
  }, [chinese]);

  const safeSetChinese = (value) => {
    const correctedValue = value
      .split("")
      .filter((char) => cedictFind(char))
      .join("");
    setChinese(correctedValue);
  };

  return (
    <>
      <Field>
        <Text>Enter something in chinese:</Text>
        <TextInput value={chinese} onChangeText={safeSetChinese} />
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
