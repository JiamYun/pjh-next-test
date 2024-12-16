import "@/app/globals.css";

import { Metadata } from "next";
import React from "react";

import StoreProvider from "./StoreProvider";
import SafeAreaProvider from "./SafeAreaProvider";

import localFont from "next/font/local";
import { Header, NavigationBar } from "@/components";
import SessionProvider from "@/provider/sessionProvider";
import useCheckProfile from "@/hooks/useCheckProfile";

export const metadata: Metadata = {
  title: "박정희대통령기념관",
  description: "박정희대통령기념관",
};

const nanum = localFont({
  src: [
    {
      path: "../fonts/NanumBarunGothic.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/NanumBarunGothicBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nanum",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nanum.variable}`}>
      <body className={nanum.className}>
        <SessionProvider>
          <StoreProvider>
            <SafeAreaProvider>
              <Header />
              <main className="w-full h-full">{children}</main>
              <NavigationBar />
            </SafeAreaProvider>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
