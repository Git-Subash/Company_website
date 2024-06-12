import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { projectType } from "./schema";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const creatFileProjects = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    imageId: v.id("_storage"),
    projectType: projectType,
  },
  async handler(ctx, args) {
    await ctx.db.insert("projects", {
      name: args.name,
      imageId: args.imageId,
      description: args.description,
      projectType: args.projectType,
    });
  },
});

//getting files
export const getProjectFiles = query({
  args: {
    projectType: v.optional(projectType),
    query: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let projectQuery = ctx.db.query("projects");

    if (args.projectType && args.projectType !== "all") {
      projectQuery = projectQuery.filter((q) =>
        q.eq(q.field("projectType"), args.projectType),
      );
    }

    const projects = await projectQuery.collect();

    let searchProjects = projects;
    if (args.query) {
      const lowerQuery = args.query.toLowerCase();
      searchProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(lowerQuery),
      );
    }

    return await Promise.all(
      searchProjects.map(async (file) => ({
        ...file,
        url: await ctx.storage.getUrl(file.imageId),
      })),
    );
  },
});

export const updateProjects = mutation({
  args: {
    id: v.id("projects"),
    imageId: v.id("_storage"),
    name: v.string(),
    description: v.string(),
    projectType: projectType,
  },
  handler: async (ctx, args) => {
    const { id, imageId, description, name, projectType } = args;
    console.log(await ctx.db.get(id));
    const project = await ctx.db.get(id);
    if (!project) {
      throw new Error("Project not found");
    }

    await ctx.db.patch(id, {
      ...project,
      name,
      imageId,
      description,
      projectType,
    });
  },
});

//delete mutation
export const deleteById = mutation({
  args: {
    id: v.id("projects"),
    imageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const { id, imageId } = args;
    if (!id) {
      throw new Error("id not found");
    }
    if (!imageId) {
      throw new Error("imageId not found");
    }

    await ctx.db.delete(id);
    await ctx.storage.delete(imageId);
  },
});
