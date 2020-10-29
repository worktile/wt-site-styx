const fs = require("fs");

fs.writeFileSync(
  process.cwd() + "/built/package.json",
  fs.readFileSync(process.cwd() + "/package.json")
);
