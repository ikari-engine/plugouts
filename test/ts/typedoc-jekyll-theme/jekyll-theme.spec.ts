import fs from "fs";
import os from "os";
import path from "path";
import { assert } from "chai";
import { Application, Logger } from "typedoc";
import { load as typedocMarkdownLoad } from "typedoc-plugin-markdown";
import { load as typedocJekyllThemeLoad } from "../../../src/ts/typedoc-jekyll-theme/load";

describe("JekyllTheme", () => {
  // Setup paths
  const basePath = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "test",
    "resources",
    "typedoc-jekyll-theme",
  );
  const configurationPath = path.resolve(basePath, "config");
  const expectedPath = path.resolve(basePath, "out");
  const temporaryPath = path.resolve(
    os.tmpdir(),
    "typedoc-jekyll-theme",
    "tests",
  );

  // Read configurations
  const configurations = fs.readdirSync(configurationPath);

  // Filter configurations
  const tests = configurations
    .map((configuration) => path.parse(configuration))
    .filter((configuration) => configuration.ext === ".json")
    .map((configuration) => configuration.name);

  // Load application
  let application: Application;
  beforeEach(async () => {
    // Bootstrap typedoc
    application = await Application.bootstrap({
      options: "./typedoc.spec.json",
    });
    typedocMarkdownLoad(application);
    typedocJekyllThemeLoad(application);
    application.options.reset();
  });

  // Run tests
  tests.forEach((test) => {
    it(`should properly generate documentation [${test}]`, async () => {
      application.options.setValue(
        "options",
        path.resolve(configurationPath, `${test}.json`),
      );
      await application.options.read(new Logger());
      application.options.setValue(
        "options",
        path.resolve(configurationPath, `${test}.json`),
      );
      application.logger.level = application.options.getValue("logLevel");

      // Load project
      const project = await application.convert();

      // Verify project
      if (project === undefined) {
        assert.fail();
      }

      // Validate project
      application.validate(project);

      // Assert errors
      assert.isFalse(application.logger.hasErrors());

      // Create parent folder
      await fs.promises.mkdir(temporaryPath, { recursive: true });

      // Create temporary folder
      const folderPath: string = await fs.promises.mkdtemp(
        path.resolve(temporaryPath, `${test}-`),
      );

      // Generate documentation
      await application.generateDocs(project, folderPath);

      // Read generated files
      const files: string[] = await fs.promises.readdir(folderPath);

      // Read expected files
      const expectedPathTest = path.resolve(expectedPath, test);
      const expectedFiles: string[] =
        await fs.promises.readdir(expectedPathTest);

      // Assert files
      assert.lengthOf(files, expectedFiles.length);
      assert.isTrue(files.every((file) => expectedFiles.includes(file)));

      // Read content of each file
      const fileContents = new Map(
        (
          await Promise.all(
            files.map((file) =>
              fs.promises.readFile(path.resolve(folderPath, file)),
            ),
          )
        ).map((fileContent, index): [string, Buffer] => [
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          files[index]!,
          fileContent,
        ]),
      );
      const expectedFileContents = new Map(
        (
          await Promise.all(
            expectedFiles.map((file) =>
              fs.promises.readFile(path.resolve(expectedPathTest, file)),
            ),
          )
        ).map((expectedFileContent, index): [string, Buffer] => [
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          expectedFiles[index]!,
          expectedFileContent,
        ]),
      );

      // Assert contents
      for (const [fileName, fileContent] of fileContents.entries()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const expectedFileContent = expectedFileContents.get(fileName)!;

        // Assert content
        assert.strictEqual(
          fileContent
            .toString()
            .trim()
            .replace(/(\r)?\n/g, os.EOL),
          expectedFileContent
            .toString()
            .trim()
            .replace(/(\r)?\n/g, os.EOL),
        );
      }
    });
  });
});
