import React, { useState } from "react";
import { Text, View, TouchableHighlight } from "react-native";

import { VerticalBorderLayout } from "ezwn-ux-native/layouts/VerticalBorderLayout-cmp";
import { TitleBar } from "ezwn-ux-native/app-components/TitleBar-cmp";
import { ContextualMenu } from "ezwn-ux-native/app-components/ContextualMenu-cmp";
import { External } from "ezwn-react-app/External-cmp";
import { ChineseCharBigCard } from "shared/chinese/components/ChineseChar";
import { useSelection } from "shared/selection/Selection-ctx";
import { ChineseCharContextMenu } from "shared/chinese/components/ChineseCharContextMenu";
import { TestComponent } from "../components/Test-cmp";
import { RemoveTextIcon } from "ezwn-ux-native/text-icons/RemoveTextIcon-cmp";
import { useChinese } from "shared/chinese/Chinese-ctx";
import { Button } from "ezwn-ux-native/app-components/Button-cmp";
import { Field } from "ezwn-ux-native/forms/Field-cmp";
import { Padded } from "ezwn-ux-native/layouts/Padded-cmp";

const PropPicker = ({ value, onValueChange }) => {
  const { propositions } = useChinese();

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

export const TestRoot = () => {
  const { selection } = useSelection();
  const [prop, setProp] = useState("");
  const [opened, setOpened] = useState(false);
  const { removeProp } = useChinese();

  const updateProp = value => {
    setOpened(false);
    setProp(value);
  }

  return (
    <VerticalBorderLayout
      top={
        <TitleBar
          left={
            <External feature="MaintenanceFeature">
              <TitleBar.SettingsButton />
            </External>
          }
          text="Daily test"
        />
      }
      bottom={
        <ContextualMenu>
          <ContextualMenu.Choice
            onPress={() => {
              removeProp(prop);
              setTimeout(() => updateProp(""), 750);
            }}
          >
            <RemoveTextIcon />
          </ContextualMenu.Choice>
          <ChineseCharContextMenu />
        </ContextualMenu>
      }
    >
      <Field>
        <PropPicker value={prop} onValueChange={updateProp} />
      </Field>
      {opened
        ? <TestComponent prop={prop} />
        : <TouchableHighlight onPress={() => setOpened(true)}>
          <View>
            <Padded>
              <Text>Click to see the translation</Text>
            </Padded>
          </View>
        </TouchableHighlight>}
      {selection && <ChineseCharBigCard char={selection} />}
    </VerticalBorderLayout>
  );
};
