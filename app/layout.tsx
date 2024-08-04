import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import Wrapper from "@/components/atoms/Wrapper";
import { LayoutWrapper } from "@/components/atoms/layout-wrapper";

const leagueSpartan = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DoxxaIT Inventory",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Wrapper>
      <html lang="en">
        <body
          className={`${leagueSpartan.className} p-4 md:p-20 overflow-y-auto bg-[#F8F8FB]`}
        >
          <LayoutWrapper>{children}</LayoutWrapper>
        </body>
      </html>
    </Wrapper>
  );
}
