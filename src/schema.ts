import {
  int,
  mysqlTable,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

export const accounts = mysqlTable("accounts", {
  id: int("id").autoincrement().primaryKey(),
  owner: text("owner").notNull(),
  balance: int("balance").notNull(),
});

export const transfers = mysqlTable("transfers", {
  id: int("id").autoincrement().primaryKey(),
  fromAccountId: int("from_account_id")
    .notNull()
    .references(() => accounts.id),
  toAccountId: int("to_account_id")
    .notNull()
    .references(() => accounts.id),
  amount: int("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const schema = { accounts, transfers };
