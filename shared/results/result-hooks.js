import { useResults } from "./Results-ctx";

export const useResultStyle = (char) => {
    const { getScoreRank } = useResults();
    let style = {};
  
    const scoreRank = getScoreRank(char);
    if (scoreRank > -1) {
      if (scoreRank <= 5) {
        style = { ...style, color: "red" };
      } else if (scoreRank <= 15) {
        style = { ...style, color: "orange" };
      } else {
        style = { ...style, color: "green" };
      }
    }
  
    return style;
  };
  