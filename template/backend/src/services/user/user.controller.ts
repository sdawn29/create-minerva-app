import type { Request, Response } from "express";
import { UserService } from "./user.service";
import {
  SuccessResponse,
  ErrorResponse,
} from "../../utils/response/api-response";

/**
 * Controller class for handling user-related operations.
 */
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Get all users.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A Promise that resolves to void.
   */
  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      new SuccessResponse(users).send(res);
    } catch (error) {
      new ErrorResponse(error as Error).send(res);
    }
  }

  /**
   * Get a user by ID.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A Promise that resolves to void.
   */
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await this.userService.getUserById(id);
      new SuccessResponse(user).send(res);
    } catch (error) {
      new ErrorResponse(error as Error).send(res);
    }
  }

  /**
   * Get a user by email.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A Promise that resolves to void.
   */
  public async getUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const email = req.params.email;
      const user = await this.userService.getUserByEmail(email);
      new SuccessResponse(user).send(res);
    } catch (error) {
      new ErrorResponse(error as Error).send(res);
    }
  }
}
