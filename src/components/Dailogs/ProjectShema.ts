import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ProjectSchema = z.object({
  projectName: z
    .string()
    .min(2)
    .max(50, { message: "Username must be at least 2 characters." }),
  description: z.string().min(2),
  type: z.string({
    required_error: "Please select a language.",
  }),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    )
    .refine((files) => files.length > 0, `Required`),
  role: z.union([z.literal("editor"), z.literal("viewer")]),
});
