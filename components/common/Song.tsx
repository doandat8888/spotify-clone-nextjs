import React from 'react'

interface Props {
    song: SpotifyApi.PlaylistTrackObject
}

const Song = ({ song }: Props) => {
    return (
        <div className="flex items-center space-x-4 ">
            <img src={song.track?.album.images[0].url} alt="" className='rounded-lg w-[40px] h-[40px]' />
            <div className="">
                <p className='truncate w-[300px] overflow-hidden text-ellipsis'>{song.track?.name}</p>
                <p className='truncate w-[300px] overflow-hidden text-ellipsis flex text-[14px] text-gray-400 space-x-1'>
                    {song.track?.artists.map((artist, index) => {
                        if (song.track?.artists) {
                            if (index !== song.track?.artists?.length - 1) return <p>{artist.name},</p>
                            else return <p>{artist.name}</p>
                        } else return ''
                    })}
                </p>
            </div>
        </div>
    )
}

export default Song