import Footer from "@/components/theme/footer";
import Header from "@/components/theme/header/Header";

export default function ThemeLayout({ children }: { children: React.ReactNode }) {
   return (
         <div className="w-full">
            <Header />
            {children}
            <Footer />
         </div>

   )
}