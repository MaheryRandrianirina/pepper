import { NavLink } from "react-router";

const menu = [
    {
        title: "Accueil",
        href: "/"
    },
    {
        title: "Mon Compte",
        href: "/mon-compte"
    },
    {
        title: "Support Reseau",
        href: "/support-reseau"
    }
]

export const NavigationMenu = ()=>{

    return <nav>
        {menu.map(item => <NavLink 
            key={menu.indexOf(item)} 
            to={item.href}>
            {item.title}
        </NavLink>)}
    </nav>
}