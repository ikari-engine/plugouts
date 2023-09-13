// import * as core from "@actions/core";
import { FailContext, SuccessContext } from "semantic-release";

export async function success(
  _?: unknown,
  context?: SuccessContext
): Promise<void> {
  if (context !== undefined) {
    context.logger.log("output something");
  }
}

export async function fail(_?: unknown, context?: FailContext): Promise<void> {
  if (context !== undefined) {
    context.logger.log("output something");
  }
}

export default {
  success,
  fail,
};
