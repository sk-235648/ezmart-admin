// app/layout.js
import "./globals.css";
import Sidebar from "../components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="w-full h-full box-border">
            <div className="w-full h-full bg-white shadow-xl flex overflow-hidden">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}