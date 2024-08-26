import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
export const metadata = {
  title:"Property Plus",
  keywords:"rental, property, real estate",
  description:"Property Plus is a rental property management platform that helps landlords manage their properties and tenants easily.",
}
const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};
export default MainLayout;
