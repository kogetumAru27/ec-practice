import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ButtonNav from "@/components/ButtonNav";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EC Practice",
  description: "学習用ECサイト",
};

export default async function RootLayout({ children }:  {children:React.ReactNode}) {
  const session = await auth();
  let cartItemsCount = 0;
  if(session){
    const cart = await prisma.cart.findUnique({
      where:{userId:session.user.id},
      include:{cartItems:true}
    });
    cartItemsCount = cart?.cartItems.reduce(
      (sum,item) => sum + item.quantity,0
    ) ?? 0;
  }
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main className="flex-1 pb-16">
          {children}
        </main>
        <ButtonNav cartItemCount={cartItemsCount}/>
      </body>
    </html>
  );
}