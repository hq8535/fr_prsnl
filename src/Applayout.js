import { Outlet } from "react-router-dom";
import Navbar from "./Components/Unavbar/Navbar";
//import Umenu from "../components/Umenu";
//import Navbar from "../components/Unavbar/Navbar";
//import Navbarn from "../components/Unavbar/Navbarn";

const ff = "<button className='ubtn ubg-red'>Test</button>"

const Applayout = () => {
    return (
        <div className="uvcontainer">
            <div className="uheader">
                <Navbar/>
            </div>
            <div className="umain">
                <Outlet/>
            </div>

        </div>
    )
}

export default Applayout;