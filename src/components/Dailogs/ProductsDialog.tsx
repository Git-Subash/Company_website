"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader } from "lucide-react";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../convex/_generated/api";
import { Doc } from "../../../convex/_generated/dataModel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { projectTypes } from "@/utils/data";
import { ProductSchema } from "./ProductShema";

type ProductsDialogProps = {
  button: ReactNode;
  editProduct?: editdata;
};

export default function ProductsDialog({
  button,
  editProduct,
}: ProductsDialogProps) {
  const generateUploadUrl = useMutation(api.products.generateUploadUrl);
  const creatFile = useMutation(api.products.creatFileProducts);
  const updateFile = useMutation(api.products.updateProducts);

  const { toast } = useToast();
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: editProduct
      ? {
          productName: editProduct.name,
          description: editProduct.description,
          price: editProduct.price,
          file: editProduct.file,
          image: editProduct.image,
          type: editProduct.type,
          role: editProduct.role,
        }
      : {
          productName: "",
          description: "",
          image: [],
          price: 1,
          type: "",
          role: "viewer",
        },
  });

  const fileRef = form.register("file");
  const numRef = form.register("price", { valueAsNumber: true });
  const type = {
    elevation: "elevation",
    interior: "interior",
    models: "models",
    floorplan: "floorplan",
  } as Record<string, Doc<"projects">["projectType"]>;

  async function onSubmit(values: z.infer<typeof ProductSchema>) {
    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": values.file[0].type },
        body: values.file[0],
      });
      console.log(values.file[0]);
      const { storageId: fileStorageId } = await result.json();

      const imageStorageId = await Promise.all(
        values.image.map(async (image) => {
          const imageUrl = await generateUploadUrl();
          const result = await fetch(imageUrl, {
            method: "POST",
            headers: { "Content-Type": image.type },
            body: image,
          });
          const { storageId: imageStorageId } = await result.json();
          return imageStorageId;
        }),
      );
      if (editProduct) {
        await updateFile({
          id: editProduct._id, // Convex ID
          name: values.productName,
          description: values.description,
          type: type[values.type],
          imageId: imageStorageId,
          file: fileStorageId,
          price: values.price,
        });
        setIsProjectDialogOpen(false);
        toast({
          variant: "default",
          title: "Project Updated",
          description: "The project has been successfully updated.",
        });
      } else {
        await creatFile({
          type: type[values.type],
          description: values.description,
          price: values.price,
          file: fileStorageId,
          imageId: imageStorageId,
          name: values.productName,
        });
        console.log(values.price);
        form.reset();

        setIsProjectDialogOpen(false);

        toast({
          variant: "default",
          title: "Project Uploaded",
          description: "Now everyone can view your Project",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "your file could not be uploaded , try again later",
      });
    }
  }

  return (
    <>
      <Dialog
        open={isProjectDialogOpen}
        onOpenChange={(isOpen) => {
          setIsProjectDialogOpen(isOpen);
          form.reset();
        }}
      >
        <DialogTrigger asChild>{button}</DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Products</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-10/12 space-y-6"
            >
              <FormField
                defaultValue={editProduct ? editProduct.name : ""}
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter project  "
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                defaultValue={editProduct ? editProduct.description : ""}
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Despriction</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your description here. "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                defaultValue={editProduct ? editProduct.price : 0}
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="enter price herre "
                        {...numRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ProjectType</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select a project type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projectTypes.map((item) => (
                          <SelectItem value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                defaultValue={editProduct ? editProduct.image : []}
                control={form.control}
                name="image"
                render={({ field: { onChange, onBlur } }) => (
                  <FormItem>
                    <FormLabel>Add Picture</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          onChange([...Array.from(e.target.files ?? [])]);
                        }}
                        onBlur={onBlur}
                        placeholder="Enter project name "
                        multiple
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        // accept=".glb,.obj"
                        placeholder="Enter project name "
                        {...fileRef}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={form.formState.isSubmitting} type="submit">
                Submit
                {form.formState.isSubmitting && (
                  <Loader className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
