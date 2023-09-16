import * as core from "@actions/core";

/**
 * Called when the release succeeds.
 * Outputs variables to be used by other GitHub actions.
 *
 * @param _ - semantic-release configuration (unused)
 * @param context - semantic-release context
 */
export function success(
  _: unknown,
  context: {
    nextRelease: {
      version: string;
    };
  },
): void {
  core.setOutput("success", "true");
  core.setOutput("version", context.nextRelease.version);
}

/**
 * Called when the release fails.
 * Outputs variables to be used by other GitHub actions.
 */
export function fail(): void {
  core.setOutput("success", "false");
}

export default {
  success,
  fail,
};
