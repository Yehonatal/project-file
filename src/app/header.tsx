/* eslint-disable @next/next/no-img-element */
"use client";

import { OrganizationSwitcher } from "@clerk/clerk-react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

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
        <div className=" max-w-screen-lg m-auto mt-12">
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
                </div>
            </div>
        </div>
    );
}
