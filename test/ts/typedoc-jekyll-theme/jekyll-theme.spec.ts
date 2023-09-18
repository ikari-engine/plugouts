import { Application, ProjectReflection } from "typedoc";
// import { load as typedocJekyllThemeLoad } from "../../../src/ts/typedoc-jekyll-theme/load";
// import { load as typedocPluginMarkdowLoad } from "typedoc-plugin-markdown";
import { assert } from "chai";

describe("JekyllTheme", () => {
  let application: Application;
  let project: ProjectReflection | undefined;

  beforeEach(async () => {
    // Bootstrap typedoc
    application = await Application.bootstrapWithPlugins({
      options: "./typedoc.json",
      entryPoints: ["./test/resources/typedoc-jekyll-theme/ts/index.ts"],
    });
    // typedocJekyllThemeLoad(application);

    // Load project
    const convertedProject = await application.convert();

    // Get project
    assert.isDefined(convertedProject);
    project = convertedProject;
    assert.isDefined(project);
  });

  it("should", () => {
    assert.isTrue(true);
  });
});
