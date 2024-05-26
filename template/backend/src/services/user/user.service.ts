import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { users } from "../../drizzle/schema";
import { NotFoundError } from "../../utils/error/not-found";

/**
 * Represents a service for managing users.
 */
export class UserService {
  constructor() {}

  /**
   * Retrieves all users.
   * @returns A promise that resolves to an array of users.
   */
  public async getUsers() {
    return await db.query.users.findMany();
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user.
   * @returns A promise that resolves to the user with the specified ID.
   */
  public async getUserById(id: number) {
    const user = await db.select().from(users).where(eq(users.id, id));
    if (user.length === 0) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return user[0];
  }

  /**
   * Retrieves a user by their email.
   * @param email - The email of the user.
   * @returns A promise that resolves to the user with the specified email.
   */
  public async getUserByEmail(email: string) {
    const user = await db.select().from(users).where(eq(users.email, email));
    if (user.length === 0) {
      throw new NotFoundError(`User with email ${email} not found`);
    }
    return user[0];
  }
}
