
import spotify from '@/app/config/spotify';
import { colorsGradient } from '@/const';
import { usePlaylistContext } from '@/contexts/PlaylistContext';
import { pickRandomColor } from '@/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import PlayListSongs from '../playlist/PlayListSongs';

const Center = () => {

    const [currentColorGradient, setCurrentColorGradient] = useState('');

    console.log(currentColorGradient);


    const { playlistContextState, updatePlaylistContextState } = usePlaylistContext();
    if (playlistContextState.selectedPlaylist) {
        console.log('Current playlist: ', playlistContextState.selectedPlaylist);
    }

    useEffect(() => {
        setCurrentColorGradient(pickRandomColor(colorsGradient));
    }, [playlistContextState?.selectedPlaylistId]);

    return (
        <div className="flex-grow h-screen text-white overflow-y-scroll scrollbar-hidden">
            <section className={`top h-[40%] w-[100%] bg-gradient-to-b from-green-500 to-black px-4 flex items-end p-8`}>
                {playlistContextState.selectedPlaylist &&
                    <div className="flex space-x-4 w-full">
                        <Image
                            src={playlistContextState.selectedPlaylist.images[0].url}
                            alt='#playlistavt' width={160}
                            height={160}
                            className='rounded-lg shadow-2xl'
                        />
                        <div className="space-y-6 text-sm py-2 flex-grow">
                            <p className='tracking-wide'>{playlistContextState.selectedPlaylist.type[0].toUpperCase() + playlistContextState.selectedPlaylist.type.slice(1, playlistContextState.selectedPlaylist.type.length)}</p>
                            <p className='text-2xl md:text-5xl lg:text-5xl text-ellipsis font-bold' id='playlist_name'>{playlistContextState.selectedPlaylist.name}</p>
                            <p className='tracking-wide'>{playlistContextState.selectedPlaylist.owner.display_name}</p>
                        </div>
                    </div>
                }
            </section>
            <PlayListSongs />
        </div>
    )
}

export default Center