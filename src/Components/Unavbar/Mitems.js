import Dropdown from "./Dropdown"

const Mitems = ({items}) => {
    return (
        <li>
            <a href={items.upag}>{items.title}</a>
            {items.submenu ? <Dropdown submenus = {items.submenu}/> : ""}
        </li>

    )
}

export default Mitems