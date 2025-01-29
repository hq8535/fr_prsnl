import { menuItems } from "../../menuItems"
import Mitems from "./Mitems";
import './css/style.css';


const Navbar = () => {
    return (
        <div>
            <nav className="dws-menu">
                <ul>
                    {menuItems.map((menu, index)=>{
                        return(
                            <Mitems items={menu} key={index}/>
                        );
                    }             
                    )}
                </ul>
  
            </nav>
        </div>
    )
}

export default Navbar
