import gitout from "../../src/ts";

describe("index", () => {
  it("#success", async () => {
    await gitout.success();
  });

  it("#fail", async () => {
    await gitout.fail();
  });
});
