import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    variable: "--font-cormorant",
    weight: ["300", "400", "600", "700"],
    style: ["normal", "italic"]
});

export const metadata: Metadata = {
    title: "STAYSPACE | Premium Home Decor",
    description: "Experience scene-based shopping for your home.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-sans`}>
                {children}
            </body>
        </html>
    );
}
