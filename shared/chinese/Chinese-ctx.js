import React, { useContext } from "react";
import { useStorage } from "ezwn-storage-native/JSONAsyncStorage";
import mock from "./mock.json";
import { useResults } from "shared/results/Results-ctx";

const STORAGE_KEY = "OLANG-chinese";

const ChineseContext = React.createContext();

export const ChineseProvider = ({ children }) => {
  const [propositions, setPropositions, loaded] = useStorage(
    STORAGE_KEY,
    10000,
    () => mock
  );
  const { results, setResults, findResult } = useResults();

  const studyProp = (chinese, reminder) => {
    if (propositions.find((prop) => prop.text === chinese)) return;

    const date = new Date().toISOString().substring(0, 10);

    let newPropositions = [...propositions];

    let newTrainingResults = { ...results };

    newPropositions.push({
      text: chinese,
      reminder,
      createdAt: date
    });

    for (let c = 0; c < chinese.length; c++) {
      const char = chinese.charAt(c);
      const isNewChar = !findResult(char);
      if (isNewChar) {
        newTrainingResults[char] = {
          date: date,
          success: false,
          score: 1
        };
      }
    }

    console.log(JSON.stringify(newTrainingResults, undefined, 1));
    console.log("-------------");
    console.log(JSON.stringify(newPropositions, undefined, 1));

    setPropositions(newPropositions);
    setResults(newTrainingResults);
  };

  const removeProp = (propChinese) => {
    console.log(`removeProp ${propChinese}`)
    setPropositions(propositions.filter(p => p.text !== propChinese));
  };

  return loaded ? (
    <ChineseContext.Provider
      value={{
        propositions,
        setPropositions,
        studyProp,
        removeProp
      }}
    >
      {children}
    </ChineseContext.Provider>
  ) : null;
};

export const useChinese = () => {
  return useContext(ChineseContext);
};
