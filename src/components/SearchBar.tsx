import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  query: z.string().min(0).max(200),
});

export function SearchBar({
  query,
  setQuery,
  className,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  className?: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setQuery(values.query);
  }

  return (
    <div className={cn("", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-2"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="relative max-w-sm space-x-2">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Search"
                    className="w-[250px]"
                  />
                </FormControl>

                <SearchIcon className="absolute right-2 top-[2px] h-5 w-5" />

                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.isLoading && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
        </form>
      </Form>
    </div>
  );
}
