import { Options, OptionsReader } from "typedoc";

export class JekyllThemeOptionsReader implements OptionsReader {
  static readonly themeName = "jekyll";

  name = "@ikari-engine/semantic-release-gitout";
  readonly order = 900;
  readonly supportsPackages = false;

  /**
   * Read user configuration from typedoc.json
   *
   * @param options - typedoc options
   */
  read(options: Options) {
    if (options.getValue("theme") === "default") {
      options.setValue("theme", JekyllThemeOptionsReader.themeName);
    }
  }
}

export default JekyllThemeOptionsReader;
