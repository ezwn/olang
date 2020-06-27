import React, { useContext } from "react";
import { useStorage } from "ezwn-storage-native/JSONAsyncStorage";
import mockedTrainingResults from "../mocks/trainingResults.json";
import mockedPropositions from "../mocks/propositions.json";

const STORAGE_KEY = "OLANG-lang-content";

export const LangContentContext = React.createContext();

export const LangContentProvider = ({ children }) => {
  const [langContent, setLangContent] = useStorage(STORAGE_KEY, 10000, () => ({
    trainingResults: mockedTrainingResults,
    propositions: mockedPropositions
  }));

  const { propositions, trainingResults } = langContent;

  /*
  console.log("-------------");
  console.log(JSON.stringify(trainingResults, undefined, 1));
  console.log("-------------");
  console.log(JSON.stringify(propositions, undefined, 1));
  console.log("-------------");
  */

  const findTrainingResult = (key) => trainingResults[key];

  const studyProp = (chinese, reminder) => {
    if (propositions.find((prop) => prop.text === chinese)) return;

    const date = new Date().toISOString().substring(0, 10);

    let newPropositions = [...propositions];

    let newTrainingResults = { ...trainingResults };

    newPropositions.push({
      text: chinese,
      reminder,
      createdAt: date
    });

    for (let c = 0; c < chinese.length; c++) {
      const char = chinese.charAt(c);
      const isNewChar = !findTrainingResult(char);
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

    setLangContent({
      trainingResults: newTrainingResults,
      propositions: newPropositions
    });
  };

  const recordSuccess = (char) => {
    const oldTrainingResult = trainingResults[char];

    const date = new Date().toISOString().substring(0, 10);

    const newTrainingResults = {
      ...trainingResults,
      [char]: {
        date: date,
        success: true,
        score: oldTrainingResult.score + 1
      }
    };

    setLangContent({ propositions, trainingResults: newTrainingResults });
  };

  const recordFailure = (char) => {
    const oldTrainingResult = trainingResults[char];
    const date = new Date().toISOString().substring(0, 10);

    const newTrainingResults = {
      ...trainingResults,
      [char]: {
        date: date,
        success: false,
        score: Math.max(Math.round(oldTrainingResult.score / 2), 1)
      }
    };

    setLangContent({ propositions, trainingResults: newTrainingResults });
  };

  const trainingResultList = Object.keys(trainingResults)
    .map((key) => ({
      ...trainingResults[key],
      char: key
    }))
    .sort((tr1, tr2) => tr1.score-tr2.score);

  const getScoreRank = (char) => {
    return trainingResultList.findIndex(trainingResult => trainingResult.char===char);
  }

  return (
    <LangContentContext.Provider
      value={{
        propositions,
        trainingResults,
        trainingResultList,
        getScoreRank,
        setLangContent,
        findTrainingResult,
        studyProp,
        recordSuccess,
        recordFailure
      }}
    >
      {children}
    </LangContentContext.Provider>
  );
};

export const useLangContent = () => {
  return useContext(LangContentContext);
};
