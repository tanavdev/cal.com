import { WEBAPP_URL } from "@calcom/lib/constants";
import { AVATAR_FALLBACK } from "@calcom/lib/constants";
import type { User, Team } from "@calcom/prisma/client";
import type { UserProfile } from "@calcom/types/UserProfile";

/**
 * Gives an organization aware avatar url for a user
 * It ensures that the wrong avatar isn't fetched by ensuring that organizationId is always passed
 */
export const getUserAvatarUrl = (
  user:
    | (Pick<User, "username"> & {
        profile: Omit<UserProfile, "upId">;
        avatarUrl: string | null;
      })
    | undefined
) => {
  if (user?.avatarUrl) {
    return user.avatarUrl;
  }
  if (!user?.username) return AVATAR_FALLBACK;
  // avatar.png automatically redirects to fallback avatar if user doesn't have one
  return `${WEBAPP_URL}/${user.profile?.username}/avatar.png${
    user.profile?.organizationId ? `?orgId=${user.profile.organizationId}` : ""
  }`;
};

export function getTeamAvatarUrl(
  team: Pick<Team, "slug"> & {
    organizationId?: number | null;
    logoUrl?: string | null;
    requestedSlug?: string | null;
  }
) {
  if (team.logoUrl) {
    return team.logoUrl;
  }
  const slug = team.slug ?? team.requestedSlug;
  return `${WEBAPP_URL}/team/${slug}/avatar.png${team.organizationId ? `?orgId=${team.organizationId}` : ""}`;
}

export const getOrgAvatarUrl = (
  org: Pick<Team, "slug"> & {
    logoUrl?: string | null;
    requestedSlug?: string | null;
  }
) => {
  if (org.logoUrl) {
    return org.logoUrl;
  }
  const slug = org.slug ?? org.requestedSlug;
  return `${WEBAPP_URL}/org/${slug}/avatar.png`;
};
