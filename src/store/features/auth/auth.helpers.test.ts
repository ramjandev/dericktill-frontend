import assert from "node:assert/strict";
import test from "node:test";

import {
  extractCurrentUserSession,
  extractExchangeSession,
} from "./auth.helpers.ts";

const mockUser = {
  userId: "user_123",
  name: "Whop User",
  email: "user@example.com",
  phone: "1234567890",
  role: "USER",
  profile: null,
  isNotification: true,
  isAgree: true,
  verifidStatus: "VERIFIED",
  createdAt: "2026-07-29T00:00:00.000Z",
  updatedAt: "2026-07-29T00:00:00.000Z",
};

test("extractExchangeSession reads the exact RTK Query unwrap response shape", () => {
  const session = extractExchangeSession({
    success: true,
    data: {
      tokens: {
        accessToken: "access-jwt",
        refreshToken: "refresh-jwt",
      },
      user: mockUser,
    },
  });

  assert.deepEqual(session, {
    accessToken: "access-jwt",
    refreshToken: "refresh-jwt",
    user: mockUser,
    role: "USER",
    subscription: null,
  });
});

test("extractExchangeSession does not treat data.result as the primary path", () => {
  const session = extractExchangeSession({
    success: true,
    data: {
      result: {
        tokens: {
          accessToken: "access-jwt",
          refreshToken: "refresh-jwt",
        },
        user: mockUser,
      },
    },
  });

  assert.equal(session, null);
});

test("extractCurrentUserSession reads the exact auth me response shape", () => {
  const session = extractCurrentUserSession(
    {
      success: true,
      user: mockUser,
    },
    {
      accessToken: "access-jwt",
      refreshToken: "refresh-jwt",
    },
  );

  assert.deepEqual(session, {
    accessToken: "access-jwt",
    refreshToken: "refresh-jwt",
    user: mockUser,
    role: "USER",
    subscription: null,
  });
});

test("extractCurrentUserSession rejects nested data.user for auth me", () => {
  const session = extractCurrentUserSession(
    {
      success: true,
      data: {
        user: mockUser,
      },
    },
    {
      accessToken: "access-jwt",
      refreshToken: "refresh-jwt",
    },
  );

  assert.equal(session, null);
});
