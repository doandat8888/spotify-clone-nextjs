'use client'
import ExtendedSession, { TokenError } from '@/types';
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import spotify from '../config/spotify';

const useSpotify = () => {

    const {data: session} = useSession();

    useEffect(() => {
        if(!session) return ;

        if((session as unknown as ExtendedSession).error === TokenError.RefreshTokenError) {
            signIn();
        }

        spotify.spotifyApi.setAccessToken((session as unknown as ExtendedSession).accessToken);
    }, [session]);

    return spotify.spotifyApi;
}

export default useSpotify