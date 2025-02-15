import { Montserrat } from "next/font/google";
import { Toaster } from 'sonner';
import AuthProvider from "@/authentication/auth";
import "./globals.css";
import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider } from "@/ui-components/theme";
import QureyProvider from "@/config/react-query";

const montserrat = Montserrat({
   weight: ["400", "500", "600", "700"],
   display: "swap",
   variable: "--font-montserrat",
   subsets: ["latin"]
})
export const metadata = {
   title: "Flight Bookings | Cloud Wings",
   description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={`${montserrat.className} ${montserrat.variable}`}>
            <QureyProvider>
               <AuthProvider>
                  <ThemeProvider>
                     {children}
                     <Toaster richColors />
                  </ThemeProvider>
               </AuthProvider>
            </QureyProvider>
         </body>
      </html>
   );
}
