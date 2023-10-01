import * as core from "@actions/core";

/**
 * Called when the release fails.
 * Outputs variables to be used by other GitHub actions.
 */
export function fail(): void {
  core.setOutput("success", "false");
}

export default fail;
