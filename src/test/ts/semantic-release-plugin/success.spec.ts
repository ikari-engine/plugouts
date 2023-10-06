import { assert } from "chai";
import * as sinon from "sinon";
import * as core from "@actions/core";
import { success } from "../../../main/ts/semantic-release-plugin/success";

const context = {
  nextRelease: {
    version: "1.0.0",
  },
};

describe(`#success`, () => {
  it(`should output \`success\` and \`version\` variables with values set to \`"true"\` and \`"${context.nextRelease.version}"\``, () => {
    const stub = sinon.stub(core, "setOutput");
    success(undefined, context);
    assert.isTrue(stub.withArgs("success", "true").calledOnce);
    assert.isTrue(
      stub.withArgs("version", context.nextRelease.version).calledOnce,
    );
  });
});
