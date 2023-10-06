import fs from "fs";
import prettier from "prettier";
import sinon from "sinon";
import { expect } from "chai";
import { prepare } from "../../../main/ts/semantic-release-plugin/prepare";

describe("#prepare", () => {
  let readFileStub: sinon.SinonStub;
  let checkStub: sinon.SinonStub;
  let formatStub: sinon.SinonStub;
  let writeFileStub: sinon.SinonStub;
  let resolveConfigStub: sinon.SinonStub;

  const defaultFilepath = "CHANGELOG.md";
  const nonDefaultFilepath = "non-default-filepath.md";
  const parser = "markdown";
  const unformattedContent = "non-formatted-content";
  const formattedContent = "formatted-content";

  beforeEach(() => {
    readFileStub = sinon.stub(fs.promises, "readFile");
    checkStub = sinon.stub(prettier, "check");
    formatStub = sinon.stub(prettier, "format");
    resolveConfigStub = sinon.stub(prettier, "resolveConfig");
    writeFileStub = sinon.stub(fs.promises, "writeFile");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should format the changelog file if it is not formatted correctly", async () => {
    readFileStub.resolves(unformattedContent);
    checkStub.resolves(false);
    formatStub.resolves(formattedContent);
    resolveConfigStub.resolves(null);

    await prepare({ changelogFile: nonDefaultFilepath });

    expect(readFileStub.calledOnceWithExactly(nonDefaultFilepath)).to.be.true;
    expect(
      checkStub.calledOnceWithExactly(unformattedContent, {
        filepath: nonDefaultFilepath,
      }),
    ).to.be.true;
    expect(
      formatStub.calledOnceWithExactly(unformattedContent, {
        filepath: nonDefaultFilepath,
      }),
    ).to.be.true;
    expect(
      writeFileStub.calledOnceWithExactly(nonDefaultFilepath, formattedContent),
    ).to.be.true;
  });

  it("should not format the changelog file if it is already formatted correctly", async () => {
    readFileStub.resolves(formattedContent);
    checkStub.resolves(true);
    resolveConfigStub.resolves(null);

    await prepare({ changelogFile: nonDefaultFilepath });

    expect(readFileStub.calledOnceWithExactly(nonDefaultFilepath)).to.be.true;
    expect(
      checkStub.calledOnceWithExactly(formattedContent, {
        filepath: nonDefaultFilepath,
      }),
    ).to.be.true;
    expect(formatStub.notCalled).to.be.true;
    expect(writeFileStub.notCalled).to.be.true;
  });

  it("should use the default changelog file if none is specified", async () => {
    readFileStub.resolves(formattedContent);
    checkStub.resolves(true);
    resolveConfigStub.resolves(null);

    await prepare({});

    expect(readFileStub.calledOnceWithExactly(defaultFilepath)).to.be.true;
    expect(
      checkStub.calledOnceWithExactly(formattedContent, {
        filepath: defaultFilepath,
      }),
    ).to.be.true;
    expect(formatStub.notCalled).to.be.true;
    expect(writeFileStub.notCalled).to.be.true;
  });

  it("should resolve configuration with correct parser", async () => {
    readFileStub.resolves(formattedContent);
    checkStub.resolves(true);
    resolveConfigStub.resolves({
      parser,
    });

    await prepare({});

    expect(readFileStub.calledOnceWithExactly(defaultFilepath)).to.be.true;
    expect(
      checkStub.calledOnceWithExactly(formattedContent, {
        parser,
      }),
    ).to.be.true;
    expect(formatStub.notCalled).to.be.true;
    expect(writeFileStub.notCalled).to.be.true;
  });
});
