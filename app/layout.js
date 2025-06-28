// app/layout.js
import "./globals.css";

export const metadata = {
  title: "EZmart",
  description: "E-commerce dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
