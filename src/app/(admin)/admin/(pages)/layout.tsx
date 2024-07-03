import AdminLayout from "@/components/admin/Layout/AdminLayout";


interface PropsType {
   children: React.ReactNode;
}
export default function Layout({ children }: PropsType) {
   return (
      <AdminLayout >
         {children}
      </AdminLayout>
   )
}
