import React, { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

interface ISideBar {
    content: string,
    icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> 
    & { title?: string | undefined; titleId?: string | undefined; } 
    & RefAttributes<SVGSVGElement>>
}

const SideBarBtn = ({ content, icon: Icon }: ISideBar) => {
    return (
        <button className='flex hover:text-white space-x-2 py-1 items-center'>
            <Icon className='icon'/> <span>{content}</span>
        </button>
    )
}

export default SideBarBtn