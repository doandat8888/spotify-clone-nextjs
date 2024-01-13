'use client';
import React, { useEffect, useId } from 'react'
import SideBarBtn from './SideBarBtn'
import { BuildingLibraryIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, PlusCircleIcon, RssIcon } from '@heroicons/react/24/outline'
import PlayListItem from '../playlist/PlayListItem'
import { signOut, useSession } from 'next-auth/react'
import { usePlaylistContext } from '@/contexts/PlaylistContext';
import { Playlist } from '@/types';
import spotify from '@/app/config/spotify';

const Divider = () => <hr className='border-t-[0.3px] border-gray-800' />

const SideBar = () => {

    const {data: session} = useSession();

    const {playlistContextState, updatePlaylistContextState} = usePlaylistContext();

    console.log('Playlist context state side bar: ', playlistContextState);

    const setSelectedPlaylist = async(playlistId: string) => {
        const selectedPlaylist: any = (await spotify.spotifyApi.getPlaylist(playlistId)).body;
        updatePlaylistContextState({
            selectedPlaylistId: playlistId,
            selectedPlaylist
        });
    }

    return (
        <div className='text-gray-500 px-5 py-5 border 
        border-gray-900 text-xs lg:text-sm h-screen sm:max-w-[20rem] w-[28%]
        lg:max-w-[30rem] hidden md:block overflow-y-scroll scrollbar-hidden'
        >
            <div className="space-y-4">
                <SideBarBtn icon={HomeIcon} content='Home' />
                <SideBarBtn icon={MagnifyingGlassIcon} content='Search' />
                <SideBarBtn icon={BuildingLibraryIcon} content='Your library' />

                <Divider />

                <SideBarBtn icon={PlusCircleIcon} content='Create playlist' />
                <SideBarBtn icon={HeartIcon} content='Liked songs' />
                <SideBarBtn icon={RssIcon} content='Your episoses' />

                <Divider />

                <div className='cursor-pointer hover:text-white space-x-2 py-1'>Acoustic cafe</div>
                {session?.user?.name && 
                    <div className='cursor-pointer hover:text-white space-x-2 py-1'>{session.user.name} | <button onClick={() => signOut()}>Log out</button></div>
                }

                <Divider />

                    {playlistContextState && playlistContextState.playlists && playlistContextState.playlists.length > 0 &&
                        playlistContextState.playlists.map((playList: Playlist, index) => (
                            <PlayListItem
                                key={index}
                                imgSrc={playList.images[0].url}
                                title={playList.name}
                                type={playList.type}
                                owner={playList.owner.display_name}
                                onUpdatePlaylist={() => setSelectedPlaylist(playList.id)}
                            />
                        ))
                    }
            </div>
        </div>
    )
}

export default SideBar