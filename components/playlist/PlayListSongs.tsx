import { usePlaylistContext } from '@/contexts/PlaylistContext';
import { convertMsToMinutesAndSeconds } from '@/utils';
import React, { useState } from 'react';
import { PlayIcon, PauseIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import PlaylistSong from './PlaylistSong';

const PlayListSongs = () => {

    const { playlistContextState, updatePlaylistContextState } = usePlaylistContext();
    const [selectedSong, setSelectedSong] = useState<SpotifyApi.PlaylistTrackObject>();

    return (
        <div className='space-y-1 px-8 pb-28 overflow-y-scroll scrollbar-hidden'>
            {playlistContextState.selectedPlaylist?.tracks && playlistContextState.selectedPlaylist.tracks.total > 0 &&
                playlistContextState.selectedPlaylist.tracks.items.map((song: SpotifyApi.PlaylistTrackObject, index) => (
                    <PlaylistSong index={index} song={song} />
                ))
            }
        </div>
    )
}

export default PlayListSongs