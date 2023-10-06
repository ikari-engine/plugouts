import { assert } from "chai";
import { Options } from "typedoc";
import JekyllThemeOptionsReader from "../../../main/ts/typedoc-jekyll-theme/jekyll-theme-options-reader";

describe("JekyllThemeOptionsReader#read", () => {
  it('should set the `"theme"` value to `themeName` if it\'s set to `"default"`', () => {
    const options = new Options();
    options.setValue("theme", "default");
    const reader = new JekyllThemeOptionsReader();
    reader.read(options);
    assert.equal(options.getValue("theme"), JekyllThemeOptionsReader.themeName);
  });

  it('should not change the `"theme"` value to `themeName` if it\'s not set to `"default"`', () => {
    const theme = "not-default";
    const options = new Options();
    options.setValue("theme", theme);
    const reader = new JekyllThemeOptionsReader();
    reader.read(options);
    assert.equal(options.getValue("theme"), theme);
  });
});
