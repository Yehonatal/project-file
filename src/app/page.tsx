import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronRightIcon } from "@radix-ui/react-icons";
export default function Home() {
    return (
        <main className="flex  flex-col items-center justify-between p-24 select-none ">
            <h1 className=" font-extrabold text-4xl mb-4">PROJECT - FILE</h1>
            <p className="text-center max-w-lg mb-4">
                Welcome to Project File 🗃️ Your Pocket-Sized Powerhouse for
                Storing, Sharing, and Organizing Your Digital World! 🌟 Get
                ready to revolutionize the way you manage your files!
            </p>
            <p className="text-left border-2 border-slate-100 rounded-lg text-sm p-2 shadow-sm bg-slate-100 max-w-lg mb-6">
                Just kidding 🫣 Its a mini google drive rip off you actually have
                zero reason to justify even a little bit of use. But you can
                still checkout the UI and judge me for free!
            </p>
            <div className="flex gap-4">
                <Button>Get started</Button>
                <div>
                    <Button variant="secondary">
                        <ChevronRightIcon className="h-4 w-4 mr-2" /> Learn more
                    </Button>
                </div>
            </div>
        </main>
    );
}
