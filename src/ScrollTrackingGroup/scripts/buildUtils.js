const fs = require("fs");
export const getFolders = (entry) => {
  const dirs = fs.readdirSync(entry);
  const dirsWithoutIndex = dirs
    .filter((name) => name !== "index.ts")
    .filter((name) => name !== "utils");
  return dirsWithoutIndex;
};
