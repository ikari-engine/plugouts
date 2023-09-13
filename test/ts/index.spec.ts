import gitout from "../../src/ts";

describe("index", () => {
  it("#prepare", async () => {
    await gitout.prepare();
  });

  it("#success", async () => {
    await gitout.success();
  });
});
