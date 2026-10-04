import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import Navbar from "./_component/navbar/page";
import Footer from "./_component/footer/page";
import FirstNav from "./_component/firstNav/page";
import MyProvider from "./_component/MyProvider/MyProvider";
import { Toaster } from "sonner";
import Providers from "./_component/TanstackProvider/TanstackProvider";

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["100", "400", "700"],
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "E-commerce Store",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${exo.className} antialiased`}
    >
      <body className="overflow-x-hidden">
        <Providers>
          <MyProvider>
             <FirstNav />
              <Navbar />
              
            <div className="w-full ">
              {children}
            </div>

            <Footer />

            <Toaster position="top-right" richColors />
          </MyProvider>
        </Providers>
      </body>
    </html>
  );
}