import * as core from "@actions/core";
import { GlobalConfig, Context } from "semantic-release";

export async function success(
  _: GlobalConfig,
  context: Context
): Promise<void> {}

export default {
  success,
};
