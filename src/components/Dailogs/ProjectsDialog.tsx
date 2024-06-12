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
import { ProjectSchema } from "./ProjectShema";
import { projectTypes } from "@/utils/data";

type ProjectsDialogProps = {
  button: ReactNode;
  editProject?: editdata;
};

const type = {
  elevation: "elevation",
  interior: "interior",
  models: "models",
  floorplan: "floorplan",
} as Record<string, Doc<"projects">["projectType"]>;

export default function ProjectsDialog({
  button,
  editProject,
}: ProjectsDialogProps) {
  const generateUploadUrl = useMutation(api.projects.generateUploadUrl);
  const creatFile = useMutation(api.projects.creatFileProjects);
  const updateFile = useMutation(api.projects.updateProjects);

  const { toast } = useToast();
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: editProject
      ? {
          projectName: editProject.name,
          description: editProject.description,
          file: editProject.file,
          type: editProject.type,
          role: editProject.role,
        }
      : {
          projectName: "",
          description: "",
          type: "",
          file: undefined,
          role: "viewer",
        },
  });

  const fileRef = form.register("file");

  async function onSubmit(values: z.infer<typeof ProjectSchema>) {
    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": values.file[0].type },
        body: values.file[0],
      });

      const { storageId } = await result.json();

      if (editProject) {
        await updateFile({
          id: editProject._id, // Convex ID
          name: values.projectName,
          description: values.description,
          projectType: type[values.type],
          imageId: storageId,
        });
        setIsProjectDialogOpen(false);
        toast({
          variant: "default",
          title: "Project Updated",
          description: "The project has been successfully updated.",
        });
      } else {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": values.file[0].type },
          body: values.file[0],
        });

        const { storageId } = await result.json();
        //creating  project files
        await creatFile({
          name: values.projectName,
          description: values.description,
          imageId: storageId,
          projectType: type[values.type],
        });

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
            <DialogTitle>
              {editProject ? "Edit Project" : "Add Project"}
            </DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click submit when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                defaultValue={editProject ? editProject.type : ""}
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
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
                defaultValue={editProject ? editProject.type : ""}
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
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Picture</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
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
