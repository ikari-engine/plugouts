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
  if (!(await prettier.check(content, prettierConfig))) {
    const result = await prettier.format(content, prettierConfig);
    await fs.promises.writeFile(path, result);
  }
}

export default prepare;
