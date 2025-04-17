import type { Metadata } from "next";
import "../lib/styles/globals.css";
import { Layout } from "@/lib/layout";

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Rick and Morty API",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {

  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
export default RootLayout;
