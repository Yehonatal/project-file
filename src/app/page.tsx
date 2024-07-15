'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignOutButton,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
export default function Home() {
    const createFile = useMutation(api.files.createFile)
    const files = useQuery(api.files.getFiles)
    return (
        <main className="flex  flex-col items-center justify-between p-24 select-none ">
            <h1 className=" font-extrabold text-4xl mb-4">FILE</h1>
            <p className="text-center max-w-lg mb-4">
                Welcome to Project File 🗃️ Your Pocket-sized powerhouse for
                storing, sharing, and organizing Your digital world! 🌟 Get
                ready to revolutionize the way you manage your files!
            </p>
            <p className="text-left border-2 border-slate-100 rounded-lg text-sm p-2 shadow-sm bg-slate-100 max-w-lg mb-6">
                Just kidding 🫣 Its a mini google drive rip off, you&apos;ll
                actually have zero reason to justify even a little bit of use.
                But you can still checkout the UI and judge me for free!
            </p>
            <div className="flex gap-4">
                <SignedIn>
                    <SignOutButton>
                        <Button>Let&apos;s Sign out</Button>
                    </SignOutButton>
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                        <Button>Sign In</Button>
                    </SignInButton>
                </SignedOut>
                <div>
                    <Button variant="secondary">
                        <ChevronRightIcon className="h-4 w-4 mr-2" /> Learn more
                    </Button>
                </div>
            </div>
            <br />

            <Button
                onClick={() => {
                    {
                        createFile({
                            name: "test world",
                        });
                    }
                }}
            >
                Click me
            </Button>

            <div>
                {files?.map((file,idx) => {
                    return (
                        <div key={idx}>
                            {file.name}
                        </div>
                    )
                })}
            </div>
        </main>
    );
}
