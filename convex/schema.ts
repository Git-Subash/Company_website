import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileType = v.union(
  v.literal("glb"),
  v.literal("fbx"),
  v.literal("obj"),
);
export const projectType = v.union(
  v.literal("elevation"),
  v.literal("interior"),
  v.literal("models"),
  v.literal("floorplan"),
  v.literal("all"),
);

export default defineSchema({
  projects: defineTable({
    description: v.string(),
    imageId: v.id("_storage"),
    name: v.string(),
    projectType: projectType,
  }),
  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    imageId: v.array(v.id("_storage")),
    file: v.id("_storage"),
    type: projectType,
  }).index("by_file", ["file"]),
});
