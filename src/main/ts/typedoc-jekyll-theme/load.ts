import { Application, ParameterType } from "typedoc";
import JekyllTheme from "./jekyll-theme";
import JekyllThemeOptionsReader from "./jekyll-theme-options-reader";

/**
 * Load the Jekyll theme
 *
 * @param application - typedoc application
 */
export function load(application: Application) {
  application.renderer.defineTheme(
    JekyllThemeOptionsReader.themeName,
    JekyllTheme,
  );
  application.options.addReader(new JekyllThemeOptionsReader());
  application.options.addDeclaration({
    help: "[Jekyll] API reference's version to use in the front matter",
    name: "apiReferenceVersion",
    type: ParameterType.String,
  });
  application.options.addDeclaration({
    help: "[Jekyll] Order of API reference in the sidebar",
    name: "apiReferenceOrder",
    type: ParameterType.Number,
    defaultValue: 0,
  });
}

export default load;
