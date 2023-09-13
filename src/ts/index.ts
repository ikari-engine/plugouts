// import * as core from "@actions/core";
import { FailContext, SuccessContext } from "semantic-release";

/**
 * Called when the release succeeds.
 * Outputs variables to be used by other GitHub actions.
 * 
 * @param _ - semantic-release configuration
 * @param context - semantic-release context
 */
export async function success(
  _?: unknown,
  context?: SuccessContext
): Promise<void> {
  if (context !== undefined) {
    context.logger.log("output something");
  }
}

/**
 * Called when the release fails.
 * Outputs variables to be used by other GitHub actions.
 * 
 * @param _ - semantic-release configuration
 * @param context - semantic-release context
 */
export async function fail(_?: unknown, context?: FailContext): Promise<void> {
  if (context !== undefined) {
    context.logger.log("output something");
  }
}

export default {
  success,
  fail,
};
