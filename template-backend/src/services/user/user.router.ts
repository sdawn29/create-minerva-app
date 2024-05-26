import { Router } from "express";
import { UserController } from "./user.controller";

/**
 * Represents the UserRouter class.
 */
export class UserRouter {
  public router: Router;
  private userController: UserController;

  /**
   * Initializes a new instance of the UserRouter class.
   */
  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  /**
   * Initializes the routes for the UserRouter.
   * @returns The router instance.
   */
  private initializeRoutes() {
    this.router.get(
      "/",
      this.userController.getUsers.bind(this.userController)
    );

    this.router.get(
      "/:id",
      this.userController.getUserById.bind(this.userController)
    );
    return this.router;
  }
}
