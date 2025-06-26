// app/layout.js
import "./globals.css";
import Sidebar from "../components/Sidebar";

// app/layout.js
 
export default function RootLayout({ children }) {
  return (
    <html className="h-full">
      <body className="h-full flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 overflow-y-auto md:ml-64">
          {children}
        </main>
      </body>
    </html>
  )
}