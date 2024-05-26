import * as fs from "fs";
import * as path from "path";

const templateDir = path.join(__dirname, "./template-backend");
console.log(templateDir);
const targetDir = process.argv[2] || "./my-app";
console.log(targetDir);

fs.readdirSync(templateDir).forEach((file) => {
  const sourcePath = path.join(templateDir, file);
  const targetPath = path.join(targetDir, file);

  fs.cpSync(sourcePath, targetPath, { recursive: true });
});
