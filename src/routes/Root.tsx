import FaFooter from "@/shared/FaFooter";
import Header from "@/shared/Header";
import { Outlet } from "react-router";


const Root = () => {
    return (
        <div>
            <Header></Header>
            <Outlet />
            <FaFooter></FaFooter>
        </div>
    );
};

export default Root;