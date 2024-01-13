'use client';
import React from 'react'
import Song from '../common/Song'
import { IoPlaySkipBackSharp, IoPlaySkipForward, IoPauseSharp } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import spotify from '@/app/config/spotify';
import useSpotify from '@/app/hooks/useSpotify';

interface Props {
    selectedSong?: SpotifyApi.PlaylistTrackObject
}

const isPlaying = false;

const Player = ({ selectedSong }: Props) => {

    const spotifyApi = useSpotify();

    const handlePlayPause = async() => {
        if(spotifyApi.getAccessToken()) {
            const response = await spotifyApi.getMyCurrentPlaybackState();
            if(!response.body) return;
            if(response.body.is_playing) {
                await spotifyApi.pause();
            }else {
                await spotifyApi.play();
            }
        }
    }

    return (

        <div className="h-24 grid grid-cols-3 bg-gradient-to-b from-black to-gray-900 
        text-xs md:text-base px-2 md:px-8 place-content-center">
            {/* Left */}
            <div className="sm:block lg:block hidden">Selected song</div>
            {/* Center */}
            <div className="flex items-center justify-center space-x-5">
                <IoPlaySkipBackSharp className='text-xl text-gray-400 cursor-pointer' />
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                    {isPlaying ?
                        <IoMdPause className='text-black text-lg cursor-pointer' onClick={handlePlayPause}/> :
                        <FaPlay className='text-black text-sm cursor-pointer' onClick={handlePlayPause}/>
                    }

                </div>
                <IoPlaySkipForward className='text-xl text-gray-400 cursor-pointer' />
            </div>
            {/* Right */}
            <div className="flex space-x-3 md:space-x-4 items-center justify-end">
                <SpeakerWaveIcon width={20} height={20} color='gray' />
                <input type="range" min={0} max={100} color='gray' />
            </div>
        </div>


    )
}

export default Player