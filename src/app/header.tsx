"use client";

import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, SignedIn } from "@clerk/clerk-react";
import {
    SignedOut,
    SignInButton,
    useAuth,
    UserButton,
    UserProfile,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";
import fileLogo from "./file.png";

export function Header() {
    const userId = useAuth();
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (userId) {
            setIsSignedIn(true);
        } else {
            setIsSignedIn(false);
        }
    }, [userId]);

    return (
        <div className=" max-w-screen-lg m-auto">
            <div className="container mx-auto flex flex-row  p-4 items-center justify-around">
                <div className="flex-1 items-center gap-2 flex flex-row">
                    <h1 className=" text-xl">F</h1>
                    <div className="w-6 ">
                        <img src="/file.png" alt="Platforms logo" />
                    </div>
                    <h1 className=" text-xl">LE</h1>
                </div>

                <div className="">
                    {isSignedIn && (
                        <div className="flex gap-4">
                            <OrganizationSwitcher />
                            <UserButton />
                        </div>
                    )}
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button>Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </div>
    );
}
