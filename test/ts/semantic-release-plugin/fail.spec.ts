import * as core from "@actions/core";
import * as sinon from "sinon";
import fail from "../../../src/ts/semantic-release-plugin/fail";
import { assert } from "chai";

describe("#fail():", () => {
  it('should output `success` variable with value set to `"false"`', () => {
    const stub = sinon.stub(core, "setOutput");
    fail();
    assert.isTrue(stub.withArgs("success", "false").calledOnce);
  });

  afterEach(() => {
    sinon.restore();
  });
});
