import { menuItems } from "../../menuItems"
import Mitems from "./Mitems";


const Navbarn = () => {
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

export default Navbarn
