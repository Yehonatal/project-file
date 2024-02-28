import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PROJECT - FILE",
    description:
        "Your Pocket-Sized Powerhouse for Storing, Sharing, and Organizing Your Digital World! Get ready to revolutionize the way you manage your files!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ConvexClientProvider>{children}</ConvexClientProvider>
            </body>
        </html>
    );
}
