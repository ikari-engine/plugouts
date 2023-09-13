// import * as core from "@actions/core";
import { PrepareContext, SuccessContext } from "semantic-release";

export async function prepare(_?: unknown, context?: PrepareContext) {
  if (context !== undefined)
    context.logger.log(`Releasing version: ${context.nextRelease.version}`);
}

export async function success(
  _?: unknown,
  context?: SuccessContext
): Promise<void> {
  if (context !== undefined) {
    context.logger.log("output something");
  }
}

export default {
  prepare,
  success,
};
