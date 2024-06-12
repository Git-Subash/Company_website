"use client";
import ProjectsDialog from "@/components/Dailogs/ProjectsDialog";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery } from "convex/react";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";

export default function Project() {
  const files = useQuery(api.projects.getProjectFiles, {});
  const deleteFiles = useMutation(api.projects.deleteById);
  const { toast } = useToast();

  async function handleClick(
    projectId: Id<"projects">,
    storageId: Id<"_storage">,
  ) {
    try {
      await deleteFiles({ id: projectId, imageId: storageId });
      toast({
        variant: "default",
        title: "Project Deleted",
        description: "The project has been successfully Deleted.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "your file could not be uploaded , try again later",
      });
    }
  }
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mt-4 bg-muted/40" x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle className="flex justify-between">
            Projects{" "}
            <ProjectsDialog
              button={<Button variant="default">Add Projects</Button>}
            />
          </CardTitle>

          <CardDescription>Manage your Projects and view Here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Image
                </TableHead>

                <TableHead className="hidden md:table-cell">Title</TableHead>

                <TableHead className="hidden md:table-cell">
                  Discription
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {files?.map((file) => (
                <TableRow key={file._id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height={100}
                      src={file.url || "img2.jpj"}
                      width={100}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{file.name}</TableCell>

                  <TableCell className="text-xs font-medium">
                    {file.description}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <ProjectsDialog
                          editProject={{
                            _id: file._id,
                            name: file.name,
                            type: file.projectType,
                            description: file.description,
                            imageId: file.imageId,
                            role: "editor",
                          }}
                          button={
                            <Button
                              className="hover:bg-accent"
                              variant="dropdown"
                            >
                              Edit
                            </Button>
                          }
                        />

                        <DropdownMenuItem
                          onClick={() => handleClick(file._id, file.imageId)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </div>
    </main>
  );
}
