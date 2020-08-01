import React, { useContext } from "react";
import { useStorage } from "ezwn-storage-native/JSONAsyncStorage";
import mock from "./mock.json";

const STORAGE_KEY = "OLANG-results";

export const ResultsContext = React.createContext();

export const ResultsProvider = ({ children }) => {
  const [results, setResults] = useStorage(STORAGE_KEY, 10000, () => (mock));

  const findResult = (key) => results[key];

  const recordSuccess = (key) => {
    const oldResult = results[key];

    const date = new Date().toISOString().substring(0, 10);

    const newResults = {
      ...results,
      [key]: {
        date: date,
        success: true,
        score: oldResult.score + 1
      }
    };

    setResults(newResults);
  };

  const recordFailure = (key) => {
    const oldResult = results[key];
    const date = new Date().toISOString().substring(0, 10);

    const newResults = {
      ...results,
      [key]: {
        date: date,
        success: false,
        score: Math.max(Math.round(oldResult.score / 2), 1)
      }
    };

    setResults(newResults);
  };

  const resultList = Object.keys(results)
    .map((key) => ({
      ...results[key],
      char: key
    }))
    .sort((tr1, tr2) => tr1.score-tr2.score);

  const getScoreRank = (char) => {
    return resultList.findIndex(trainingResult => trainingResult.char===char);
  }

  return (
    <ResultsContext.Provider
      value={{
        results,
        resultList,
        getScoreRank,
        setResults,
        findResult,
        recordSuccess,
        recordFailure
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = () => {
  return useContext(ResultsContext);
};
