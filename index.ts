import * as fs from "fs";
import * as path from "path";

const templateDir = path.join(__dirname, "template/backend");
const targetDir = process.argv[2] || ".";

fs.readdirSync(templateDir).forEach((file) => {
  const sourcePath = path.join(templateDir, file);
  const targetPath = path.join(targetDir, file);

  fs.copyFileSync(sourcePath, targetPath);
});
