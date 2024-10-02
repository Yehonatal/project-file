import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    query: z.string().min(1).max(200),
});
export function SearchBar({
    query,
    setQuery,
}: {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: "",
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setQuery(values.query);
    }
    return (
        <div className="mr-4">
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex gap-2 items-center  justify-center"
                >
                    <FormField
                        control={form.control}
                        name="query"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Search ..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="flex gap-2"
                    >
                        {form.formState.isSubmitting && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <SearchIcon />
                    </Button>
                </form>
            </FormProvider>
        </div>
    );
}
