import Footer from "@/components/theme/footer";
import Header from "@/components/theme/header/Header";
import { Suspense } from 'react'
interface PropsType {
   children: React.ReactNode;
}
export default function ThemeLayout({ children }: { children: React.ReactNode }) {
   return (
      <Suspense fallback={<div>Loading...</div>}>
         <div className="w-full">
            <Header />
            {children}
            <Footer />
         </div>
      </Suspense>

   )
}