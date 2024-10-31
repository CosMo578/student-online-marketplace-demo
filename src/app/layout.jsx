import "./globals.css";
import { Poppins } from "next/font/google";
import { AuthContextProvider } from "./Context/AuthContext";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Student Marketplace",
  description:
    "An innovative marketplace for students to trade academic items and foster entreprenurial mindset",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={poppins.className}>
        <AuthContextProvider>
          <ShoppingCartProvider>{children}</ShoppingCartProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
