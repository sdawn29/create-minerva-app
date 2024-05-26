import { pgTable, serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }),
    hashedPassword: varchar("hashed_password", { length: 256 }),
    email: varchar("email", { length: 256 }),
  },
  (users) => {
    return {
      emailIndex: uniqueIndex("email_idx").on(users.email),
    };
  }
);

export const adminUsers = pgTable(
  "admin_users",
  {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }),
    hashedPassword: varchar("hashed_password", { length: 256 }),
    email: varchar("email", { length: 256 }),
  },
  (adminUsers) => {
    return {
      userIdIndex: uniqueIndex("admin_email_idx").on(adminUsers.email),
    };
  }
);
