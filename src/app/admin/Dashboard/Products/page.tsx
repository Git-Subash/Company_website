"use client";
import { MoreHorizontal } from "lucide-react";
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
  DropdownMenuLabel,
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
import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import ProductsDialog from "@/components/Dailogs/ProductsDialog";
import { useToast } from "@/components/ui/use-toast";
import { Id } from "../../../../../convex/_generated/dataModel";

export default function Products() {
  const files = useQuery(api.products.getProductFiles, {});
  const deleteFiles = useMutation(api.products.deleteById);
  const { toast } = useToast();

  async function handleClick(
    projectId: Id<"products">,
    storageId: Id<"_storage">[],
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
            Products{" "}
            <ProductsDialog
              button={<Button variant="default">Add Products</Button>}
            />
          </CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] lg:table-cell">
                  Image
                </TableHead>
                <TableHead>Name</TableHead>

                <TableHead className="md:table-cell">Price</TableHead>

                <TableHead className="md:table-cell">Discription</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files?.map((item) => (
                <TableRow key={item._id} className="table-row items-center">
                  <TableCell className="hidden lg:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height={200}
                      src={item.urls[0] || "img.jpg"}
                      width={200}
                    />
                    <p className="text-xs">files {item.urls.length}</p>
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>

                  <TableCell className="md:table-cell">{item.price}</TableCell>

                  <TableCell className="inline-block w-[200px] overflow-hidden text-ellipsis text-nowrap">
                    {item.description}
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
                        <ProductsDialog
                          editProduct={{
                            _id: item._id,
                            name: item.name,
                            type: item.type,
                            description: item.description,
                            image: [new File([""], "example.png")],
                            price: item.price,
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
                          onClick={() => handleClick(item._id, item.imageId)}
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
