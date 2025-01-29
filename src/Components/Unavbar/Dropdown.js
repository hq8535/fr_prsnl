import Mitems from "./Mitems"

const Dropdown = ({submenus}) => {
    return (
        <ul>
            {submenus.map((submenu, index)=>(
                
                   <Mitems items={submenu} key={index}/>
                
            )
        )}

        </ul>
    )

}

export default Dropdown