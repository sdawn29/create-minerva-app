import type { Request, Response, NextFunction } from "express";
import chalk from "chalk";

/**
 * Abstract class representing a base logger middleware.
 */
export abstract class BaseLoggerMiddleware {
  /**
   * Logs a message.
   * @param message - The message to be logged.
   */
  public abstract log(message: string): void;

  /**
   * Returns the middleware function.
   * @returns The middleware function.
   */
  public getMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const start = Date.now();
      res.on("finish", () => {
        const duration = Date.now() - start;
        const timestamp = new Date().toISOString();
        const method = this.formatMethod(req.method);
        const route = req.originalUrl;
        const statusCode = this.formatStatusCode(res.statusCode);

        this.log(
          `[${timestamp}] ${method} ${statusCode} ${route} ${duration}ms`
        );
      });

      next();
    };
  }

  /**
   * Formats the HTTP method string with color using the `chalk` library.
   * @param method - The HTTP method string.
   * @returns The formatted method string with color.
   */
  private formatMethod(method: string): string {
    switch (method) {
      case "GET":
        return chalk.green(method);
      case "POST":
        return chalk.blue(method);
      case "PUT":
        return chalk.yellow(method);
      case "DELETE":
        return chalk.red(method);
      default:
        return chalk.white(method);
    }
  }

  /**
   * Formats the HTTP status code string with color using the `chalk` library.
   * @param statusCode - The HTTP status code.
   * @returns The formatted status code string with color.
   */
  private formatStatusCode(statusCode: number): string {
    if (statusCode >= 200 && statusCode < 300) {
      return chalk.green(statusCode.toString());
    } else if (statusCode >= 300 && statusCode < 400) {
      return chalk.cyan(statusCode.toString());
    } else if (statusCode >= 400 && statusCode < 500) {
      return chalk.yellow(statusCode.toString());
    } else {
      return chalk.red(statusCode.toString());
    }
  }
}
