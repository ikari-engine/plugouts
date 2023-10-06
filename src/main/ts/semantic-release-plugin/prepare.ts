import fs from "fs";
import * as prettier from "prettier";

export async function prepare(config: {
  changelogFile?: string;
}): Promise<void> {
  const path = config.changelogFile ?? "CHANGELOG.md";
  const text = await fs.promises.readFile(path);
  const content = text.toString();
  const prettierConfig = (await prettier.resolveConfig(path)) ?? {
    filepath: path,
  };
  console.log("Checking if CHANGELOG.md is formatted correctly...");
  if (!(await prettier.check(content, prettierConfig))) {
    console.log("CHANGELOG.md is not formatted correctly. Formatting...");
    const result = await prettier.format(content, prettierConfig);
    await fs.promises.writeFile(path, result);
    console.log("CHANGELOG.md has been formatted.");
  }
}

export default prepare;
