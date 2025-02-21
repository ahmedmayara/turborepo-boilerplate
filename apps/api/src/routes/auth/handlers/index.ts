import type {
  SignInRoute,
  SignOutRoute,
  SignUpRoute,
} from "@/routes/auth/routes";
import type { AppRouteHandler } from "@/types";
import { comparePasswords, hashPassword } from "@/utils/auth";
import { db } from "@repo/database/src/client";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import {
  createSession,
  generateSessionToken,
  getCurrentSession,
  invalidateSession,
} from "@/lib/auth";

export const signIn: AppRouteHandler<SignInRoute> = async (c) => {
  const { email, password } = c.req.valid("json");

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return c.json(
      {
        message: HttpStatusPhrases.UNAUTHORIZED,
      },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }

  const isPasswordValid = await comparePasswords(
    password,
    existingUser.password,
  );

  if (!isPasswordValid) {
    return c.json(
      {
        message: HttpStatusPhrases.UNAUTHORIZED,
      },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }

  const token = await generateSessionToken();

  await createSession(token, existingUser.id);

  return c.json({ token }, HttpStatusCodes.OK);
};

export const signUp: AppRouteHandler<SignUpRoute> = async (c) => {
  const { name, email, password } = c.req.valid("json");

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return c.json(
      {
        message: HttpStatusPhrases.CONFLICT,
      },
      HttpStatusCodes.CONFLICT,
    );
  }

  const hashedPassword = await hashPassword(password);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const ommittedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return c.json({ user: ommittedUser }, HttpStatusCodes.CREATED);
};

export const signOut: AppRouteHandler<SignOutRoute> = async (c) => {
  const token = c.req.header("Authorization");

  if (!token) {
    return c.json(
      {
        message: HttpStatusPhrases.UNAUTHORIZED,
      },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }

  const result = await getCurrentSession(token);

  if (!result.session || !result.user) {
    return c.json(
      {
        message: HttpStatusPhrases.UNAUTHORIZED,
      },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }

  await invalidateSession(result.session.id);

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
