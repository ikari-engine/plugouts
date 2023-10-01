import { assert } from "chai";
import * as sinon from "sinon";
import * as core from "@actions/core";
import fail from "../../../main/ts/semantic-release-plugin/fail";

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
