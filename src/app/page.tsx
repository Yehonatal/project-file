"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useAuth, useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
    const organization = useOrganization();

    const user = useUser();
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
        <main className="flex flex-col items-center justify-between md:p-24 sm:p-8 p-10 select-none">
            <h1 className="font-extrabold text-4xl mb-4">PROJECT FILE</h1>
            <p className="text-center max-w-lg mb-4">
                Welcome to Project File 🗃️ Your Pocket-sized powerhouse for
                storing, sharing, and organizing Your digital world! 🌟 Get
                ready to revolutionize the way you manage your files!
            </p>
            <p className="text-left border-2 border-slate-100 rounded-lg text-sm p-2 shadow-sm bg-slate-100 max-w-lg mb-6">
                Just kidding 🫣 It&apos;s a mini Google Drive rip off,
                you&apos;ll actually have zero reason to justify even a little
                bit of use. But you can still check out the UI and judge me for
                free!
            </p>
            <div className="flex gap-4">
                <div className="flex md:gap-10 gap-4">
                    <Button>Let&apos;s get started</Button>
                    <Button variant="secondary">
                        <ChevronRightIcon className="h-4 w-4 mr-2" /> Learn more
                    </Button>
                </div>
            </div>
            <br />
            <br />
            <br />
            <Button
                onClick={() => {
                    {
                        if (!usableId) return;
                        createFile({
                            name: "test world",
                            orgId: usableId,
                        });
                    }
                }}
            >
                Add test file
            </Button>

            <div>
                {files && files.length > 0 ? (
                    files.map((file, idx) => (
                        <div key={idx}>
                            {accountName} |{file.name}
                        </div>
                    ))
                ) : (
                    <div>
                        <br />
                        No files found
                    </div>
                )}
            </div>
        </main>
    );
}
