import Header from "../UI/Headers";
import { Footers } from "../UI/Footers";
import { Outlet } from "react-router-dom";
export const AppLayout = () => {
	return (
    <>
    <Header/>
    <Outlet />
    <Footers />
    </>

  );
}