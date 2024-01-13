import { convertMsToMinutesAndSeconds } from '@/utils'
import { PauseIcon, PlayIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import Song from '../common/Song'
import { useSongContext } from '@/contexts/SongContext'
import { SongReducerActionType } from '@/types'
import useSpotify from '@/app/hooks/useSpotify'
import { usePlaylistContext } from '@/contexts/PlaylistContext'

interface Props {
    index: number,
    song: SpotifyApi.PlaylistTrackObject,
}

const PlaylistSong = ({ index, song }: Props) => {

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const spotify = useSpotify();

    const {songContextState: {deviceId}, dispatchSongAction} = useSongContext();
    const {playlistContextState: selectedPlaylist} = usePlaylistContext();

    const handleClickBtn = async(index: number, type: string) => {
        setSelectedIndex(index);
        setIsPlaying(!isPlaying);
        if(type === 'play') {
            dispatchSongAction({
                type: SongReducerActionType.SetCurrentPlayingSong,
                payload: {
                    selectedSongId: song.track?.id as string,
                    selectedSong: song,
                    isPlaying: true
                }
            })

            await spotify.play({
                device_id: deviceId as string,
                context_uri: selectedPlaylist.selectedPlaylist?.uri,
                offset: {
                    uri: song.track?.uri as string
                }
            })
        }
    }

    return (
        <div className="flex py-3 items-center hover:bg-[#2A2A2A] cursor-pointer px-4 rounded-lg playlistitem">
            <span className='min-w-[28px] w-[3%] text-gray-500 playlistnum'>
                {isPlaying === true && selectedIndex === index ? <SpeakerWaveIcon color='green' width={20} height={20} /> : index}
            </span>
            <button
                className={`min-w-[21px] mr-2 text-gray-500 playbtn hidden`}
            >
                {isPlaying === true && selectedIndex === index ? <PauseIcon onClick={() => handleClickBtn(index, 'pause')} />
                    : isPlaying === false && selectedIndex === index ? <PlayIcon onClick={() => handleClickBtn(index, 'play')} />
                        : <PlayIcon onClick={() => handleClickBtn(index, 'play')} />
                }
            </button>
            <div className="lg:w-[50%] w-[90%]">
                <Song song={song}/>
            </div>
            <div className='w-[45%] text-sm hidden lg:block text-gray-500'>
                <p className='truncate w-[200px] overflow-hidden text-ellipsis '></p>{song.track?.album.name}
            </div>
            <p className='w-[5%] text-sm text-gray-500'>
                {convertMsToMinutesAndSeconds(song.track?.duration_ms ? song.track.duration_ms : 0)}
            </p>
        </div>
    )
}

export default PlaylistSong