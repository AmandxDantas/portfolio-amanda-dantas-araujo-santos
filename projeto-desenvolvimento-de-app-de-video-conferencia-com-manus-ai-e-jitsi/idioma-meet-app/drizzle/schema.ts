import { int, mysqlTable, text, timestamp, varchar, mysqlEnum, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// User Profile table
export const userProfiles = mysqlTable("user_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  nativeLanguage: varchar("nativeLanguage", { length: 10 }).notNull().default("pt"),
  learningLanguages: json("learningLanguages").$type<string[]>().notNull(),
  proficiencyLevel: mysqlEnum("proficiencyLevel", ["beginner", "intermediate", "advanced"])
    .notNull()
    .default("beginner"),
  totalConversations: int("totalConversations").notNull().default(0),
  totalMinutes: int("totalMinutes").notNull().default(0),
  averageRating: int("averageRating").notNull().default(0),
  isProfileComplete: boolean("isProfileComplete").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = typeof userProfiles.$inferInsert;

// Conversations table
export const conversations = mysqlTable("conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId1: int("userId1").notNull(),
  userId2: int("userId2").notNull(),
  language: varchar("language", { length: 10 }).notNull(),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  endedAt: timestamp("endedAt"),
  durationMinutes: int("durationMinutes").notNull().default(0),
  jitsiRoomId: varchar("jitsiRoomId", { length: 255 }),
  status: mysqlEnum("status", ["active", "completed", "cancelled"]).notNull().default("active"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = typeof conversations.$inferInsert;

// Ratings table
export const ratings = mysqlTable("ratings", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  ratedByUserId: int("ratedByUserId").notNull(),
  ratedUserId: int("ratedUserId").notNull(),
  rating: int("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Rating = typeof ratings.$inferSelect;
export type InsertRating = typeof ratings.$inferInsert;

// Matchmaking queue table
export const matchmakingQueue = mysqlTable("matchmaking_queue", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  learningLanguage: varchar("learningLanguage", { length: 10 }).notNull(),
  proficiencyLevel: mysqlEnum("proficiencyLevel", ["beginner", "intermediate", "advanced"])
    .notNull()
    .default("beginner"),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
  status: mysqlEnum("status", ["waiting", "matched", "cancelled"]).notNull().default("waiting"),
  matchedWithUserId: int("matchedWithUserId"),
});

export type MatchmakingQueue = typeof matchmakingQueue.$inferSelect;
export type InsertMatchmakingQueue = typeof matchmakingQueue.$inferInsert;
