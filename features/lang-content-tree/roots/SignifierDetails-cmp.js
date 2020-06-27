import React from "react";
import { Text, Button, Linking } from "react-native";
import { useParams } from "react-router";

import { VerticalBorderLayout } from "ezwn-ux-native/layouts/VerticalBorderLayout-cmp";
import { TitleBar } from "ezwn-ux-native/app-components/TitleBar-cmp";
import { ContextualMenu } from "ezwn-ux-native/app-components/ContextualMenu-cmp";
import { AddTextIcon } from "ezwn-ux-native/text-icons/AddTextIcon-cmp";
import { External } from "ezwn-react-app/External-cmp";
import { useLangContent } from "shared/lang-content/contexts/LangContent-ctx";
import { NumberInput } from "ezwn-ux-native/forms/NumberInput-cmp";
import { TextInput } from "ezwn-ux-native/forms/TextInput-cmp";
import { Field } from "ezwn-ux-native/forms/Field-cmp";
import { Padded } from "ezwn-ux-native/layouts/Padded-cmp";

export const SignifierDetails = () => {
  const { signifierId } = useParams();
  const { findTrainingResult } = useLangContent();
  const signifier = findTrainingResult(signifierId);

  return (
    <VerticalBorderLayout
      top={<TitleBar left={<TitleBar.BackButton />} text={signifierId} />}
      bottom={<LangContentTreeContextualMenu />}
    >
      <Field>
        <Text>Pinyin:</Text>
        <TextInput value={signifier.pinyin} />
      </Field>
      <Field>
        <Text>Reminder:</Text>
        <TextInput value={signifier.reminder} />
      </Field>
      <Field>
        <Text>Score:</Text>
        <NumberInput value={signifier.latestResults?.score || 0} />
      </Field>
      <Field>
        <Text>Training date:</Text>
        <TextInput value={signifier.latestResults?.date || "NEVER"} />
      </Field>
      <Field>
        <Text>Test result:</Text>
        <TextInput value={signifier.latestResults?.success ? "SUCCESS" : "FAILURE"} />
      </Field>
      <SignifierLinks signifier={signifier} />
    </VerticalBorderLayout>
  );
};

const SignifierLinks = ({ signifier }) => {
  return (
    <Padded>
      {signifier.links && (
        <>
          {signifier.links.map((link) => (
            <Button
              key={link.title}
              title={link.title}
              onPress={() => Linking.openURL(link.href)}
            />
          ))}
        </>
      )}
    </Padded>
  );
};
