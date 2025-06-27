import Sidebar from "@/components/Sidebar";
import "../../app/globals.css"; // optional if already imported globally

export const metadata = {
  title: "EZmart Admin",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-4 bg-white">
        {children}
      </main>
    </div>
  );
}
