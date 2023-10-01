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

  readonly apiReferenceVersion: string | undefined;
  readonly apiReferenceOrder: number;

  constructor(renderer: Renderer) {
    super(renderer);
    const entryDocument = renderer.application.options.getValue(
      "entryDocument",
    )! as string;
    this.entryDocument = entryDocument.length > 0 ? entryDocument : "Home.md";
    const apiReferenceVersion = renderer.application.options.getValue(
      "apiReferenceVersion",
    ) as string;
    this.apiReferenceVersion =
      apiReferenceVersion.length > 0 ? apiReferenceVersion : undefined;
    this.apiReferenceOrder = renderer.application.options.getValue(
      "apiReferenceOrder",
    ) as number;
    this.stopListening(this.owner, RendererEvent.END);
    this.listenTo(this.owner, {
      [PageEvent.END]: this.onJekyllPageEnd.bind(this),
      [RendererEvent.END]: this.onJekyllRendererEnd.bind(this),
    });
  }

  get yamls(): readonly [string, FrontMatterVars][] {
    return this.#yamls;
  }

  onJekyllPageEnd(pageEvent: PageEvent<ContainerReflection>): void {
    if (pageEvent.contents !== undefined) {
      const isRoot = pageEvent.model.name === pageEvent.model.project.name;
      const yamlVariables = {
        layout: "page",
        title:
          (isRoot ? this.apiReferenceVersion : undefined) ??
          pageEvent.model.name,
        parent: isRoot
          ? "API - Reference"
          : this.apiReferenceVersion ?? pageEvent.model.project.name,
        has_toc: false,
        ...(!isRoot && {
          grand_parent: "API - Reference",
        }),
      };
      this.#yamls.push([pageEvent.url, yamlVariables]);
    }
  }

  onJekyllRendererEnd(rendererEvent: RendererEvent): void {
    for (const [index, [url, yamlVariables]] of this.yamls.entries()) {
      const isRoot = !("grand_parent" in yamlVariables);
      const filePath = path.join(rendererEvent.outputDirectory, url);
      const inputContent = fs.readFileSync(filePath);
      const outputContent = prependYAML(inputContent.toString(), {
        ...yamlVariables,
        has_children: isRoot && this.yamls.length > 1,
        nav_order: isRoot ? this.apiReferenceOrder : index,
      });
      fs.writeFileSync(filePath, outputContent);
    }
  }

  /* private static trimOrDefault(value: string, defaultValue: string): string {
    const trimmedValue = value.trim();
    return trimmedValue.length > 0 ? trimmedValue : defaultValue;
  } */
}

export default JekyllTheme;
