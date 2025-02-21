import type { Session, User } from "@repo/database/generated/client";

export type SafeUser = Omit<User, "password">;

export type SessionValidationResult =
  | { session: Session; user: SafeUser }
  | { session: null; user: null };
