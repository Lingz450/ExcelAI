/**
 * Authentication Helpers
 * Utility functions for session management and route protection
 */

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function requireAuth() {
  const session = await getSession();
  
  if (!session) {
    redirect("/auth/signin");
  }
  
  return session;
}

export function checkSubscription(user: any, requiredTier: "FREE" | "PRO" | "TEAM") {
  const tiers = { FREE: 0, PRO: 1, TEAM: 2 };
  const userTier = tiers[user?.subscription || "FREE"];
  const required = tiers[requiredTier];
  
  return userTier >= required;
}

