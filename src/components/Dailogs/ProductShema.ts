import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ProductSchema = z.object({
  productName: z
    .string()
    .min(2)
    .max(50, { message: "Username must be at least 2 characters." }),
  description: z.string().min(2),
  type: z.string({
    required_error: "Please select a type of Product.",
  }),
  price: z.number().min(2),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, { message: "File is required." }),

  image: z
    .array(z.instanceof(File))
    .refine(
      (files) =>
        files.every(
          (file) =>
            file.size <= MAX_FILE_SIZE &&
            ACCEPTED_IMAGE_TYPES.includes(file.type),
        ),
      {
        message:
          "Item photo: Only .jpeg, .jpg, .png files of 2MB or less are accepted",
      },
    ),
  role: z.union([z.literal("editor"), z.literal("viewer")]),
});
