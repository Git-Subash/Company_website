import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { asyncMap } from "./lib/relationships";
import { projectType } from "./schema";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

//creating project
export const creatFileProducts = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    imageId: v.array(v.id("_storage")),
    file: v.id("_storage"),
    type: projectType,
  },
  async handler(ctx, args) {
    await ctx.db.insert("products", {
      name: args.name,
      description: args.description,
      price: args.price,
      imageId: args.imageId,
      file: args.file,
      type: args.type,
    });
  },
});

//getting files
export const getProductFiles = query({
  args: {
    query: v.optional(v.string()),
    id: v.optional(v.id("products")),
  },
  handler: async (ctx, args) => {
    let productQuery = ctx.db.query("products");

    const products = await productQuery.collect();

    let searchProducts = products;

    if (args.query) {
      const lowerQuery = args.query.toLowerCase();
      searchProducts = products.filter((item) =>
        item.name.toLowerCase().includes(lowerQuery),
      );
    }
    return await asyncMap(searchProducts, async (product) => {
      const imageUrls = await Promise.all(
        product.imageId.map(async (id) => (await ctx.storage.getUrl(id)) ?? ""),
      );

      return {
        ...product,
        urls: imageUrls,
        file: (await ctx.storage.getUrl(product.file)) ?? "",
      };
    });
  },
});

//updating products
export const updateProducts = mutation({
  args: {
    id: v.id("products"),
    imageId: v.array(v.id("_storage")),
    file: v.id("_storage"),
    name: v.string(),
    description: v.string(),
    type: projectType,
    price: v.number(),
  },
  handler: async (ctx, args) => {
    const { id, imageId, description, name, type, price, file } = args;
    console.log(await ctx.db.get(id));

    const products = await ctx.db.get(id);
    if (!products) {
      throw new Error("Project not found");
    }
    await ctx.db.patch(id, {
      name,
      price,
      file,
      imageId,
      description,
      type,
    });
  },
});

//delete mutation
export const deleteById = mutation({
  args: {
    id: v.id("products"),
    imageId: v.array(v.id("_storage")),
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
    //adding for loop
    for (const imgId of imageId) {
      await ctx.storage.delete(imgId);
    }
  },
});
