import sinon from "sinon";
import { assert } from "chai";
import { Application, Options, Renderer } from "typedoc";
import { load } from "../../../main/ts/typedoc-jekyll-theme/load";
import JekyllTheme from "../../../main/ts/typedoc-jekyll-theme/jekyll-theme";
import JekyllThemeOptionsReader from "../../../main/ts/typedoc-jekyll-theme/jekyll-theme-options-reader";

// Write test to test load function
describe("load", () => {
  it("should define the Jekyll theme", async () => {
    const application = sinon.createStubInstance(Application);
    application.options = new Options();
    application.renderer = new Renderer(application);
    const spy = sinon.spy(application.renderer, "defineTheme");
    load(application);
    await application.options.read(application.logger);
    assert.equal(
      application.options.getValue("theme"),
      JekyllThemeOptionsReader.themeName,
    );
    assert.isTrue(
      spy.calledOnceWith(JekyllThemeOptionsReader.themeName, JekyllTheme),
    );
  });

  afterEach(() => {
    sinon.restore();
  });
});
