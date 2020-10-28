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
import { createPortal } from "react-dom";

const PropPicker = ({ value: index, onValueChange }) => {
  const { propositions } = useChinese();

  const prop = propositions[index];

  const nextPropOffset = index < propositions.length - 1 ? index + 1 : null;
  const previousPropOffset = index > 0 ? index - 1 : null;

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Button
        enabled={previousPropOffset !== null}
        onPress={() => onValueChange(previousPropOffset)}
      >
        <Text>Previous</Text>
      </Button>
      <Text style={{ flex: 1, marginLeft: 25 }}>{prop.reminder}</Text>
      <Button
        enabled={nextPropOffset !== null}
        onPress={() => onValueChange(nextPropOffset)}
      >
        <Text>Next</Text>
      </Button>
    </View>
  );
};

const FirstStep = ({ prop, onNextStep }) => (
  <Padded>
    <Padded>
      <Text>Translate this in chinese and try to write each ideogram:</Text>
    </Padded>
    <Padded>
      <Text>{prop.reminder}</Text>
    </Padded>
    <TouchableHighlight onPress={onNextStep}>
      <View>
        <Padded>
          <Text>Click to see the translation</Text>
        </Padded>
      </View>
    </TouchableHighlight>
  </Padded>
);

const SecondStep = ({ prop, onNextStep }) => {
  const { selection } = useSelection();

  return (
    <>
      <TestComponent prop={prop.text} />
      {selection && <ChineseCharBigCard char={selection} />}
    </>
  );
};

const stepComponents = [FirstStep, SecondStep];

export const TestRoot = () => {
  const { propositions } = useChinese();
  const [propOffset, setPropOffset] = useState(0);
  const [step, setStep] = useState(0);
  const { removeProp } = useChinese();

  const prop = propositions[propOffset];

  const updateProp = (offset) => {
    setStep(0);
    setPropOffset(offset);
  };

  const StepComponent = stepComponents[step];

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
              removeProp(prop.text);
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
        <PropPicker value={propOffset} onValueChange={updateProp} />
      </Field>
      {StepComponent && (
        <StepComponent prop={prop} onNextStep={() => setStep(step + 1)} />
      )}
    </VerticalBorderLayout>
  );
};
