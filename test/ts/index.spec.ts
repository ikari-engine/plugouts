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

  it(`#success(undefined, ${context})`, async () => {
    const stub = sinon.stub(core, "setOutput");
    await gitout.success(undefined, context);
    assert.isTrue(stub.withArgs("success", "true").calledOnce);
    assert.isTrue(
      stub.withArgs("version", context.nextRelease.version).calledOnce
    );
  });

  it("#fail(undefined, undefined)", async () => {
    const stub = sinon.stub(core, "setOutput");
    await gitout.fail(undefined, undefined);
    assert.isTrue(stub.withArgs("success", "false").calledOnce);
  });

  afterEach(() => {
    sinon.restore();
  });
});
