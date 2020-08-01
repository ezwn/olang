import React, { useEffect } from "react";


import { Field } from "ezwn-ux-native/forms/Field-cmp";


import { ChineseTestProp } from "shared/chinese/components/ChineseTestProp";
import { useSelection } from "shared/selection/Selection-ctx";

export const TestComponent = ({ prop }) => {
  const { setSelection } = useSelection();

  useEffect(() => {
    setSelection(null);
  }, [prop]);

  return <Field>{prop !== "" && <ChineseTestProp chinese={prop} />}</Field>;
};
