import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Doc } from "../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share, ExternalLink, EllipsisVertical, TrashIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";

function FileCardActions({ file }: { file: Doc<"files"> }) {
    const { toast } = useToast();

    const deleteFile = useMutation(api.files.deleteFile);
    const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);
    return (
        <>
            <AlertDialog
                open={isConfirmedOpen}
                onOpenChange={setIsConfirmedOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your file from our server.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                try {
                                    deleteFile({
                                        fileId: file._id,
                                    });
                                    toast({
                                        variant: "default",
                                        title: "File Removed Successfully 🎉",
                                        description:
                                            "Now the file is deleted from our servers.",
                                    });
                                } catch {
                                    toast({
                                        variant: "destructive",
                                        title: "Something went wrong",
                                        description:
                                            "Your file could not be deleted, please try again.",
                                    });
                                }
                            }}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="flex gap-2 items-center text-sm  cursor-pointer">
                        <ExternalLink className="w-4" />
                        Open
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="flex gap-2 items-center text-sm text-red-500 cursor-pointer"
                        onClick={() => setIsConfirmedOpen(true)}
                    >
                        <TrashIcon className="w-4" />
                        Delete
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex gap-2 items-center text-sm text-blue-500 cursor-pointer">
                        <Share className="w-4" />
                        Share
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export function FileCard({ file }: { file: Doc<"files"> }) {
    return (
        <Card className="relative">
            <CardHeader>
                <div className="flex justify-between">
                    <CardTitle>{file.name}</CardTitle>
                    <div className="absolute right-2 top-4">
                        <FileCardActions file={file} />
                    </div>
                </div>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <Button>Download</Button>
            </CardFooter>
        </Card>
    );
}
