import { cedictRawString } from "./cedict_ts.u8.js";

const cedictEntries = cedictRawString
  .split("\n")
  .filter((line) => !line.startsWith("#"))
  .map((line) => {
    const lineParts = line.split(" /");
    const tokens = lineParts[0].split(" ");
    return {
      traditionnal: tokens[0],
      simplified: tokens[1],
      pinyin: tokens
        .filter((t, i) => i >= 2)
        .map((pinyinItem) => pinyinItem.toLowerCase().replace(/[\[\]]+/g, ""))
    };
  });

export const cedictFind = (char) => {
  const entry = cedictEntries.find(
    (i) => i.simplified === char || i.traditionnal === char
  );
  if (!entry) {
    console.warn(`Could not find ${char}`);
  }
  return entry;
};
