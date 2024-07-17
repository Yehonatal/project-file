"use client";

import { useState, useEffect } from "react";
import { useAuth, useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";
import UploadButton from "./upload-button";
import { FileCard } from "./file-card";
import { Loader2 } from "lucide-react";

export default function Home() {
    const organization = useOrganization();
    const user = useUser();

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
    const { userId } = useAuth();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const isLoading = files === undefined;

    useEffect(() => {
        if (userId) {
            setIsSignedIn(true);
        } else {
            setIsSignedIn(false);
        }
    }, [userId]);

    return (
        <main className="p-4 pt-12 select-none max-w-screen-lg m-auto ">
            {isLoading && (
                <div className="grid place-content-center justify-center h-[80vh]">
                    <Loader2 className="mr-2 h-32 w-32 animate-spin" />
                </div>
            )}
            {!isLoading &&
                files.length > 0 &&
                files.map((file, idx) => (
                    <>
                        <div className="flex flex-row justify-between ">
                            <h1 className="text-2xl mb-4 font-extrabold">
                                YOUR <span className="">FILES</span>{" "}
                            </h1>
                            <UploadButton />
                        </div>
                        <hr className="mt-4 mb-8" />
                        <div className="grid gap-4 grid-cols-3 ">
                            <FileCard key={idx} file={file} />
                        </div>
                    </>
                ))}

            {files && files.length === 0 && (
                <div className="grid gap-4 grid-cols-3 ">
                    <div className="col-span-3 row-span-3 relative">
                        <img
                            className="w-full h-full opacity-15"
                            src="./empty.png"
                            alt="Empty"
                        />
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-600">
                            <h1 className="text-4xl font-extrabold  mb-4">
                                DRIVE EMPTY
                            </h1>
                            <p className="mb-2">
                                You have no files, you can start uploading know,
                                only document types are allowed with max size
                                being less then 5mb.
                            </p>
                            <UploadButton />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
