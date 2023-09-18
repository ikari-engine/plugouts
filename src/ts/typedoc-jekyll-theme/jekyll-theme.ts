import fs from "fs";
import path from "path";
import {
  ContainerReflection,
  PageEvent,
  Renderer,
  RendererEvent,
} from "typedoc";
import { GithubWikiTheme } from "typedoc-github-wiki-theme/dist/theme";
import {
  FrontMatterVars,
  prependYAML,
} from "typedoc-plugin-markdown/dist/utils/front-matter";

export class JekyllTheme extends GithubWikiTheme {
  readonly #yamls = new Array<[string, FrontMatterVars]>();
  readonly #apiReferenceVersion?: string | undefined;
  readonly #apiReferenceOrder: number;

  constructor(renderer: Renderer) {
    super(renderer);
    const entryDocument =
      renderer.application.options.getValue("entryDocument");
    this.entryDocument =
      (typeof entryDocument === "string" || entryDocument instanceof String) &&
      entryDocument.trim().length > 0
        ? entryDocument.valueOf()
        : "Home.md";
    const apiReferenceVersion = renderer.application.options.getValue(
      "apiReferenceVersion",
    );
    this.#apiReferenceVersion =
      (typeof apiReferenceVersion === "string" ||
        apiReferenceVersion instanceof String) &&
      apiReferenceVersion.trim().length > 0
        ? apiReferenceVersion.valueOf().trim()
        : undefined;
    const apiReferenceOrder =
      renderer.application.options.getValue("apiReferenceOrder");
    this.#apiReferenceOrder =
      typeof apiReferenceOrder === "number" ||
      apiReferenceOrder instanceof Number
        ? apiReferenceOrder.valueOf()
        : 0;
    this.stopListening(this.owner, RendererEvent.END);
    this.listenTo(this.owner, {
      [PageEvent.END]: this.onJekyllPageEnd.bind(this),
      [RendererEvent.END]: this.onJekyllRendererEnd.bind(this),
    });
  }

  onJekyllPageEnd(pageEvent: PageEvent<ContainerReflection>): void {
    if (pageEvent.contents !== undefined) {
      const isRoot = pageEvent.model.name === pageEvent.model.project.name;
      const yamlVariables = {
        layout: "page",
        title:
          (isRoot ? this.#apiReferenceVersion : undefined) ??
          pageEvent.model.name,
        parent: isRoot
          ? "API - Reference"
          : this.#apiReferenceVersion ?? pageEvent.model.project.name,
        has_toc: false,
        ...(!isRoot && {
          grand_parent: "API - Reference",
        }),
      };
      this.#yamls.push([pageEvent.url, yamlVariables]);
    }
  }

  onJekyllRendererEnd(rendererEvent: RendererEvent): void {
    for (const [index, [url, yamlVariables]] of this.#yamls.entries()) {
      const isRoot = !("grand_parent" in yamlVariables);
      const filePath = path.join(rendererEvent.outputDirectory, url);
      const inputContent = fs.readFileSync(filePath);
      const outputContent = prependYAML(inputContent.toString(), {
        ...yamlVariables,
        has_children: isRoot && this.#yamls.length > 1,
        nav_order: isRoot ? this.#apiReferenceOrder : index,
      });
      fs.writeFileSync(filePath, outputContent);
    }
  }
}

export default JekyllTheme;
