import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { getUser } from "./users";
import { fileTypes } from "./schema";
import { Id } from "./_generated/dataModel";

export const getFileUrl = query(
    async ({ storage }, { fileId }: { fileId: Id<"_storage"> }) => {
        const url = await storage.getUrl(fileId);
        return url;
    }
);

export const generateUploadUrl = mutation(async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
        throw new ConvexError("User must be logged in to upload file!");
    }
    return await ctx.storage.generateUploadUrl();
});

async function hasAccessToOrg(
    ctx: MutationCtx | QueryCtx,
    tokenIdentifier: string,
    orgId: string
) {
    const user = await getUser(ctx, tokenIdentifier);
    return user.orgIds.includes(orgId) || user.tokenIdentifier.includes(orgId);
}

export const createFile = mutation({
    args: {
        name: v.string(),
        orgId: v.string(),
        fileId: v.id("_storage"),
        type: fileTypes,
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new ConvexError("User must be logged in to upload file!");
        }

        const hasAccess = await hasAccessToOrg(
            ctx,
            identity.tokenIdentifier,
            args.orgId
        );
        if (!hasAccess) {
            throw new ConvexError("User does not have access to this org!");
        }

        await ctx.db.insert("files", {
            name: args.name,
            orgId: args.orgId,
            fileId: args.fileId,
            type: args.type,
        });
    },
});

export const getFiles = query({
    args: {
        orgId: v.string(),
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return [];
        }
        const hasAccess = await hasAccessToOrg(
            ctx,
            identity.tokenIdentifier,
            args.orgId
        );
        if (!hasAccess) {
            return [];
        }

        return ctx.db
            .query("files")
            .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
            .collect();
    },
});

export const deleteFile = mutation({
    args: { fileId: v.id("files") },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new ConvexError("User does not have access to this org!");
        }

        const file = await ctx.db.get(args.fileId);
        if (!file) {
            throw new ConvexError("File doesn't exist.");
        }
        const hasAccess = await hasAccessToOrg(
            ctx,
            identity.tokenIdentifier,
            file.orgId
        );
        if (!hasAccess) {
            throw new ConvexError(
                "User does not have access to delete this file!"
            );
        }

        await ctx.db.delete(args.fileId);
    },
});
