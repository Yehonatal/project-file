/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { api } from "../../convex/_generated/api";
import UploadButton from "./upload-button";
import { FileCard } from "./file-card";
import { Loader2, CirclePlus } from "lucide-react";
import { SignedOut, SignInButton, useAuth } from "@clerk/nextjs";
import { SearchBar } from "./search-bar";

function Placeholder() {
    return (
        <div className="">
            <div className="col-span-3 row-span-3 relative">
                <img
                    className="w-full h-full opacity-15"
                    src="./empty.png"
                    alt="Empty"
                />
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-600">
                    <h1 className="text-2xl font-extrabold  mb-4">
                        DRIVE EMPTY
                    </h1>
                    <p className="mb-4">
                        You have no files, you can start uploading know, only
                        document types are allowed with max size being less then
                        5mb.
                    </p>
                    <UploadButton content={<CirclePlus />} />
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    const organization = useOrganization();
    const user = useUser();
    const [query, setQuery] = useState("");

    // Account
    let usableId: string | undefined = undefined;
    if (organization.isLoaded && user.isLoaded) {
        if (organization.organization?.id) {
            usableId = organization.organization?.id;
        } else {
            usableId = user.user?.id;
        }
    }

    const files = useQuery(
        api.files.getFiles,
        usableId ? { orgId: usableId, query } : "skip"
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
            {!isLoading && (
                <div>
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-2xl mb-4 font-light">
                            YOUR <span className="">FILES</span>{" "}
                        </h1>
                        <SearchBar query={query} setQuery={setQuery} />

                        <UploadButton content="UPLOAD" />
                    </div>
                    <hr className="mt-4 mb-8" />
                </div>
            )}

            <div>
                {isSignedIn && (
                    <div className="grid gap-4 lg:grid-cols-3 sm:grid-cols-1">
                        {isLoading && (
                            <div className="fixed inset-0 flex items-center justify-center">
                                <Loader2 className="mr-2 h-32 w-32 animate-spin opacity-20" />
                            </div>
                        )}
                        {!isLoading &&
                            files.length > 0 &&
                            files.map((file) => (
                                <FileCard key={file._id} file={file} />
                            ))}
                    </div>
                )}
            </div>

            {files && !query && files.length === 0 && <Placeholder />}

            {!isSignedIn && (
                <div className="items-center flex flex-col">
                    <div className="font-extrabold text-4xl mb-4 flex gap-4">
                        <h1 className=" text-4xl">PROJECT</h1>{" "}
                        <span className="flex items-center">
                            <h1 className=" text-4xl">F</h1>
                            <img
                                className="w-8 h-8"
                                src="/file.png"
                                alt="Platforms logo"
                            />
                            <h1 className=" text-4xl">LE</h1>
                        </span>
                    </div>
                    <p className="text-center max-w-lg mb-4">
                        Welcome to Project File 🗃️ Your Pocket-sized powerhouse
                        for storing, sharing, and organizing Your digital world!
                        🌟 Get ready to revolutionize the way you manage your
                        files!
                    </p>
                    <p className="text-left border-2 border-slate-100 rounded-lg text-sm p-2 shadow-sm bg-slate-100 max-w-lg mb-6">
                        Just kidding 🫣 It&apos;s a mini Google Drive rip off,
                        you&apos;ll actually have zero reason to justify even a
                        little bit of use. But you can still check out the UI
                        and judge me for free!
                    </p>
                    <div className="flex gap-4">
                        <div className="flex md:gap-10 gap-4">
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <Button>Let&apos;s get started</Button>
                                </SignInButton>
                            </SignedOut>
                            <Button variant="secondary">
                                <ChevronRightIcon className="h-4 w-4 mr-2" />{" "}
                                Learn more
                            </Button>
                        </div>
                    </div>
                    <br />
                </div>
            )}
        </main>
    );
}
