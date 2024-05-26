import express from "express";
import chalk from "chalk";
import boxen from "boxen";
import cors from "cors";
import { UserRouter } from "./services/user/user.router";
import { APP } from "./constants/app.constant";
import { ConsoleLoggerMiddleware } from "./middleware/logger/console-logger.middleware";
import { client } from "./drizzle/db";

/**
 * Represents the main application class.
 */
class App {
  private app: express.Application;
  private userRouter: UserRouter;

  /**
   * Represents the main application class.
   */
  constructor() {
    this.app = express();
    this.userRouter = new UserRouter();
    this.setMiddlewares();
    this.setRoutes();
  }

  /**
   * Sets up the connection to the database.
   * @returns {Promise<void>} A promise that resolves when the database connection is established.
   */
  private async setDatabase() {
    try {
      await client.connect();
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      process.exit(1);
    }
  }

  /**
   * Sets up the middlewares for the application.
   * This method adds the necessary middlewares such as CORS, JSON parsing, and console logging.
   */
  private setMiddlewares() {
    const consoleLogger = new ConsoleLoggerMiddleware();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(consoleLogger.getMiddleware());
  }

  /**
   * Sets up the routes for the application.
   */
  private setRoutes() {
    this.app.use("/v1/users", this.userRouter.router);
  }

  /**
   * Starts the application.
   * @param appName - The name of the application.
   * @param port - The port number to listen on.
   */
  public async start(appName: string, port: number) {
    try {
      await this.setDatabase();
      this.app.listen(port, () => {
        const data = {
          databaseConnection: "SUCCESS",
          environment: process.env.NODE_ENV ?? "dev",
          port: port,
          appName: appName,
          serverUrl: `http://localhost:${port}`,
        };

        const title = chalk.bold(appName);
        const bodyLines = Object.entries(data).map(([key, value]) => {
          return (
            chalk.white(`${key.charAt(0).toUpperCase() + key.slice(1)}:`) +
            `  ${chalk.cyan(value)}`
          );
        });

        const output = boxen([...bodyLines].join("\n"), {
          title: title,
          padding: 1,
          margin: 1,
          borderStyle: "round",
          borderColor: "green",
        });

        console.log(output);
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}

const app = new App();
app.start(APP.NAME, APP.PORT);
