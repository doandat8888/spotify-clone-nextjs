import Image from 'next/image'
import React from 'react'

interface Props {
    imgSrc: string,
    title: string,
    type: string,
    owner: string,
    onUpdatePlaylist: () => void
}

function PlayListItem({imgSrc, title, type, owner, onUpdatePlaylist}: Props) {
    return (
        <div onClick={onUpdatePlaylist} className="flex space-x-3 items-center cursor-pointer hover:opacity-90">
            <img src={imgSrc} alt='#playListImg' className='w-[3rem] h-[3rem] rounded-lg'/>
            <div className="space-y-0.5">
                <p className='text-white text-sm lg:text-sm'>{title}</p>
                <div className="flex space-x-2 text-ellipsis">
                    <p>{type}</p>
                    <li className='w-[5px]'></li>
                    <p>{owner}</p>
                </div>
            </div>
        </div>
    )
}

export default PlayListItem