"use client"
import Center from '@/components/center/Center'
import SideBar from '@/components/sidebar/SideBar'
import { getServerSession } from 'next-auth'
import Head from 'next/head'
import Image from 'next/image'
import { authOptions } from './api/auth/[...nextauth]/route'
import PlaylistContextProvider from '@/contexts/PlaylistContext'
import Player from '@/components/player/Player'
import SongContextProvider from '@/contexts/SongContext'

export default async function Home() {
    return (
        <div className="bg-black h-full">
            <PlaylistContextProvider>
                <SongContextProvider>
                    <main className="flex bg-black-500 w-full h-[90%]">
                        <SideBar />
                        <Center />
                    </main>
                    <div className="sticky bottom-0 text-white">
                        <Player />
                    </div>
                </SongContextProvider>
            </PlaylistContextProvider>
        </div>

    )
}
