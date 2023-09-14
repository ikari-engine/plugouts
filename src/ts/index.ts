import * as core from "@actions/core";

/**
 * Called when the release succeeds.
 * Outputs variables to be used by other GitHub actions.
 *
 * @param _ - semantic-release configuration
 * @param context - semantic-release context
 */
export async function success(
  _: unknown,
  context: {
    nextRelease: {
      version: string;
    };
  }
): Promise<void> {
  core.setOutput("success", "true");
  core.setOutput("version", context.nextRelease.version);
}

/**
 * Called when the release fails.
 * Outputs variables to be used by other GitHub actions.
 *
 * @param _0 - semantic-release configuration
 * @param _1 - semantic-release context
 */
export async function fail(_0: unknown, _1: unknown): Promise<void> {
  core.setOutput("success", "false");
}

export default {
  success,
  fail,
};
