import type { Metadata } from "next";
import "./globals.css";
import { FooterComponent } from "./components/FooterComponent/FooterComponent";
import { HeaderComponent } from "./components/HeaderComponent/HeaderComponent";
import { ReduxProviders } from "@/redux/Providers";

export const metadata: Metadata = {
  title: "Rentify",
  description: "Rentify - Property Rental App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <HeaderComponent />
        <ReduxProviders>{children}</ReduxProviders>
        <FooterComponent />
      </body>
    </html>
  );
}