import Login from "@/components/theme/auth/Login"
import Footer from "@/components/theme/footer"
import Header from "@/components/theme/header/Header"
import React from "react"
export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
   return (
      <div className="w-full">
         <Header />
         {children}
         <Login />
         <Footer />
      </div>
   )
}