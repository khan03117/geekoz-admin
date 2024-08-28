import React from 'react'
import { Link, useLocation } from 'react-router-dom'
interface Prop {
    title: string;
    link: string;
    icon: React.ReactNode,
}
const SideLink: React.FC<Prop> = ({ title, link, icon, }) => {
    const location = useLocation();
    const getLinkClass = (path: string) => {
        return location.pathname === path
            ? 'w-full py-3 px-4 block bg-primary text-white rounded-lg'
            : 'w-full py-3 px-4 block bg-opacity-30 rounded-lg';
    }
    return (
        <>
            <Link to={'/' + link} className={getLinkClass('/' + link)}>
                {icon}   <span className="ms-5">{title}</span>
            </Link>
        </>
    )
}

export default SideLink
