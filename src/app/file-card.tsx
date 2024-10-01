import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Share,
    ExternalLink,
    EllipsisVertical,
    TrashIcon,
    ImageIcon,
    GanttChartIcon,
    FileTextIcon,
} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReactNode, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { getFileUrl } from "../../convex/files";

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
    const typesIcons = {
        image: <ImageIcon />,
        pdf: <FileTextIcon />,
        csv: <GanttChartIcon />,
    } as Record<Doc<"files">["type"], ReactNode>;

    const fileUrl = useQuery(api.files.getFileUrl, {
        fileId: file.fileId as Id<"_storage">,
    }) as string | null;
    return (
        <Card className="relative">
            <CardHeader>
                <div className="flex justify-between">
                    <CardTitle>
                        <div className="flex gap-2 items-center">
                            <p>{typesIcons[file.type]}</p>
                            <h2 className="text-xl ">{file.name}</h2>
                        </div>
                    </CardTitle>
                    <div className="absolute right-2 top-4">
                        <FileCardActions file={file} />
                    </div>
                </div>
                {/* <CardDescription>
                    Files will get their own description at some point in the
                    development cycle.
                </CardDescription> */}
            </CardHeader>
            <CardContent className=" lg:h-[200px] flex justify-center items-center">
                {file.type === "image" && (
                    <Image
                        className="w-full"
                        alt={file.name}
                        width="200"
                        height="200"
                        src={fileUrl!}
                    />
                )}
                {file.type === "csv" && (
                    <GanttChartIcon className="lg:w-24 lg:h-24 w-12 h-12" />
                )}
                {file.type === "pdf" && (
                    <FileTextIcon className="lg:w-24 lg:h-24 w-12 h-12" />
                )}
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() => {
                        // TODO: Open a new tab on a file location on convex
                        window.open(fileUrl!, "_blank");
                    }}
                >
                    Download
                </Button>
            </CardFooter>
        </Card>
    );
}
