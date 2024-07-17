"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useAuth, useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, LoaderCircle } from "lucide-react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    title: z.string().min(1).max(200),
    file: z
        .custom<FileList>((val) => val instanceof FileList, "Required")
        .refine((files) => files.length > 0, `Required`),
});

export default function Home() {
    const organization = useOrganization();
    const user = useUser();
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const { toast } = useToast();
    // Form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            file: undefined,
        },
    });
    const fileRef = form.register("file");

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        console.log(values.file);
        if (!usableId) return;
        const postUrl = await generateUploadUrl();
        const fileType = values.file[0].type;
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": fileType },
            body: values.file[0],
        });
        const { storageId } = await result.json();
        // await sendImage({ storageId, author: name });

        try {
            await createFile({
                name: values.title,
                fileId: storageId,
                orgId: usableId,
            });
            form.reset();
            setIsFileDialogOpen(false);

            toast({
                variant: "success",
                title: "File Uploaded Successfully 🎉",
                description:
                    "Now everyone with valid access rights can view your file",
            });
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: "Your file could not be uploaded, try again later",
            });
        }
    }

    const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

    // Account
    let accountName: string | undefined | null = undefined;
    let usableId: string | undefined = undefined;
    if (organization.isLoaded && user.isLoaded) {
        if (organization.organization?.id) {
            usableId = organization.organization?.id;
            accountName = organization.organization.name;
        } else {
            usableId = user.user?.id;
            accountName = user.user?.fullName;
        }
    }

    const files = useQuery(
        api.files.getFiles,
        usableId ? { orgId: usableId } : "skip"
    );
    const createFile = useMutation(api.files.createFile);
    const { userId } = useAuth();
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (userId) {
            setIsSignedIn(true);
        } else {
            setIsSignedIn(false);
        }
    }, [userId]);

    return (
        <main className="p-4 pt-12 select-none max-w-screen-lg m-auto ">
            <div className="flex flex-row justify-between">
                <h1 className="text-2xl mb-4 font-extrabold">
                    YOUR <span className="">FILES</span>{" "}
                </h1>
                <Dialog
                    open={isFileDialogOpen}
                    onOpenChange={(isOpen) => {
                        setIsFileDialogOpen(isOpen);
                        form.reset();
                    }}
                >
                    <DialogTrigger asChild>
                        <Button onClick={() => {}}>Upload file</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="mb-4">
                                Upload your file
                            </DialogTitle>
                            <DialogDescription>
                                This file will be accessible by anyone in your
                                organization
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-8"
                                >
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem className="mt-4">
                                                <div className="flex gap-4 items-center">
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter title for the file"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="file"
                                        render={() => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        {...fileRef}
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
                                        Submit
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <hr />
        </main>
    );
}
