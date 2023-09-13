// import * as core from "@actions/core";
import { Context } from "semantic-release";

export async function success(_?: unknown, context?: Context): Promise<void> {
  if (context !== undefined) {
    context.logger.log("output something");
  }
}

export default {
  success,
};
