import useSpotify from "@/app/hooks/useSpotify";
import { ISongContext, SongContextState, SongReducerActionType } from "@/types";
import { ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { songReducer } from "@/reducers/SongReducer";
import { useSession } from "next-auth/react";

const defaultSongContextState: SongContextState = {
    selectedSongId: '',
    selectedSong: null,
    isPlaying: false,
    volume: 50,
    deviceId: null
}

export const SongContext = createContext<ISongContext> ({
    songContextState: defaultSongContextState,
    dispatchSongAction: () => { }
}) 

export const useSongContext = () => useContext(SongContext);

const SongContextProvider = ({children}: {children: ReactNode}) => {

    const spotifyApi = useSpotify();
    const { data: session } = useSession();

    const [songContextState, dispatchSongAction] = useReducer(songReducer, defaultSongContextState);

    const songContextProviderData = {
        songContextState: defaultSongContextState,
        dispatchSongAction
    }

    useEffect(() => {
        const setCurrentDevice = async() => {
            //Get current device to provide for Spotify API
            let availableDevicesResponse = await spotifyApi.getMyDevices();
            if(!availableDevicesResponse.body.devices.length) return ;
            const { id: deviceId, volume_percent } = availableDevicesResponse.body.devices[0]
            dispatchSongAction({
                type: SongReducerActionType.SetDevice,
                payload: {
                    deviceId,
                    volume: volume_percent as number
                }
            });
            //Transfer functions of Spotify (Play music, pause,...) to my device
            await spotifyApi.transferMyPlayback([deviceId as string]);
        }
        if(spotifyApi.getAccessToken()) setCurrentDevice();
    }, [spotifyApi, session])

    return (
        <SongContext.Provider value={songContextProviderData}>
            {children}
        </SongContext.Provider>
    )
}

export default SongContextProvider