import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
}

export default Layout;