import * as core from "@actions/core";
import * as sinon from "sinon";
import gitout from "../../src/ts";
import { assert } from "chai";

describe("index", () => {
  const context = {
    nextRelease: {
      version: "1.0.0",
    },
  };

  it(`#success(undefined, ${JSON.stringify(context)})`, () => {
    const stub = sinon.stub(core, "setOutput");
    gitout.success(undefined, context);
    assert.isTrue(stub.withArgs("success", "true").calledOnce);
    assert.isTrue(
      stub.withArgs("version", context.nextRelease.version).calledOnce
    );
  });

  it("#fail()", () => {
    const stub = sinon.stub(core, "setOutput");
    gitout.fail();
    assert.isTrue(stub.withArgs("success", "false").calledOnce);
  });

  afterEach(() => {
    sinon.restore();
  });
});
