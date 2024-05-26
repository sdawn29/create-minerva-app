import { BaseLoggerMiddleware } from "./base-logger.middleware";

/**
 * Middleware class for logging messages to the console.
 */
export class ConsoleLoggerMiddleware extends BaseLoggerMiddleware {
  /**
   * Logs a message to the console.
   * @param message - The message to be logged.
   */
  public log(message: string): void {
    console.log(message);
  }
}
