'use client'
import useSpotify from "@/app/hooks/useSpotify";
import { IPlaylistContext, PlaylistContextState } from "@/types"
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

const defaultPlaylistContextState: PlaylistContextState = {
    playlists: [],
    selectedPlaylistId: null,
    selectedPlaylist: null
}

export const PlaylistContext = createContext<IPlaylistContext> ({
    playlistContextState: defaultPlaylistContextState,
    updatePlaylistContextState: () => {}
}) 

export const usePlaylistContext = () => useContext(PlaylistContext);

const PlaylistContextProvider = ({children}: {children: ReactNode}) => {

    const {data: session} = useSession();
    const spotifyApi = useSpotify();

    const [playlistContextState, setPlaylistContextState] = useState<PlaylistContextState>(defaultPlaylistContextState);

    const updatePlaylistContextState = (updatedObj: Partial<PlaylistContextState>) => { //Partial: Get just few parts of PlaylistContextState
        setPlaylistContextState(prevPlaylistContextState => ({
            ...prevPlaylistContextState,
            ...updatedObj
        }));
    }

    const getUserPlaylist = async() => {
        try {
            let response = await spotifyApi.getUserPlaylists();
            updatePlaylistContextState({playlists: response.body.items})
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(spotifyApi.getAccessToken()) {
            // console.log('TOKEN: ', spotifyApi.getAccessToken());
            getUserPlaylist();
        }else {
            console.log('error when getting data...');
        }
    }, [session, spotifyApi]);
    

    const playlistContextProviderData = {
        playlistContextState,
        updatePlaylistContextState
    }

    return (
        <PlaylistContext.Provider value={playlistContextProviderData}>
            {children}
        </PlaylistContext.Provider>
    )
}

export default PlaylistContextProvider;