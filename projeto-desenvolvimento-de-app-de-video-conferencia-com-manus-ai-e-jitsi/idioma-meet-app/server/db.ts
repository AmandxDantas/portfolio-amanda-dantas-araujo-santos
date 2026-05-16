import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// ============ User Profile Functions ============

export async function getUserProfile(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const { userProfiles } = await import("../drizzle/schema");
  const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId));
  return result[0] || null;
}

export async function createUserProfile(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { userProfiles } = await import("../drizzle/schema");
  const result = await db.insert(userProfiles).values(data);
  return result[0]?.insertId || 0;
}

export async function updateUserProfile(userId: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { userProfiles } = await import("../drizzle/schema");
  await db.update(userProfiles).set(data).where(eq(userProfiles.userId, userId));
}

// ============ Matchmaking Functions ============

export async function addToMatchmakingQueue(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { matchmakingQueue } = await import("../drizzle/schema");
  const result = await db.insert(matchmakingQueue).values(data);
  return result[0]?.insertId || 0;
}

export async function removeFromMatchmakingQueue(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { matchmakingQueue } = await import("../drizzle/schema");
  await db.delete(matchmakingQueue).where(eq(matchmakingQueue.userId, userId));
}

export async function findMatchForUser(userId: number, language: string) {
  const db = await getDb();
  if (!db) return null;

  const { matchmakingQueue } = await import("../drizzle/schema");
  const { and, eq: drizzleEq } = await import("drizzle-orm");

  // Find a waiting user with the same language
  const matches = await db
    .select()
    .from(matchmakingQueue)
    .where(
      and(
        drizzleEq(matchmakingQueue.learningLanguage, language),
        drizzleEq(matchmakingQueue.status, "waiting"),
      ),
    )
    .limit(1);

  return matches[0] || null;
}

export async function updateMatchmakingQueueStatus(
  id: number,
  status: "waiting" | "matched" | "cancelled",
  matchedWithUserId?: number,
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { matchmakingQueue } = await import("../drizzle/schema");
  const updateData: any = { status };
  if (matchedWithUserId) {
    updateData.matchedWithUserId = matchedWithUserId;
  }

  await db.update(matchmakingQueue).set(updateData).where(eq(matchmakingQueue.id, id));
}

// ============ Conversation Functions ============

export async function createConversation(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { conversations } = await import("../drizzle/schema");
  const result = await db.insert(conversations).values(data);
  return result[0]?.insertId || 0;
}

export async function getConversation(conversationId: number) {
  const db = await getDb();
  if (!db) return null;

  const { conversations } = await import("../drizzle/schema");
  const result = await db.select().from(conversations).where(eq(conversations.id, conversationId));
  return result[0] || null;
}

export async function updateConversationStatus(
  conversationId: number,
  status: "active" | "completed" | "cancelled",
  durationMinutes?: number,
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { conversations } = await import("../drizzle/schema");
  const updateData: any = { status };
  if (durationMinutes !== undefined) {
    updateData.durationMinutes = durationMinutes;
    updateData.endedAt = new Date();
  }

  await db.update(conversations).set(updateData).where(eq(conversations.id, conversationId));
}

// ============ Rating Functions ============

export async function createRating(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const { ratings } = await import("../drizzle/schema");
  const result = await db.insert(ratings).values(data);
  return result[0]?.insertId || 0;
}

export async function getUserRatings(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const { ratings } = await import("../drizzle/schema");
  return db.select().from(ratings).where(eq(ratings.ratedUserId, userId));
}

export async function getAverageRating(userId: number) {
  const db = await getDb();
  if (!db) return 0;

  const userRatings = await getUserRatings(userId);
  if (userRatings.length === 0) return 0;

  const sum = userRatings.reduce((acc: number, r: any) => acc + r.rating, 0);
  return Math.round((sum / userRatings.length) * 10) / 10;
}
