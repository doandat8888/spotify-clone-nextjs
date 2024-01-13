"use client";
import React, { useEffect, useState } from 'react'
import Button from '../../components/common/Button';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';

const Login = () => {

    const [providerName, setProviderName] = useState('');
    const [providerId, setProviderId] = useState('');

    const getProvider = async () => {
        try {
            const providers = await getProviders();
            if(providers) {
                const providerSpotify = providers?.spotify as ClientSafeProvider;
                setProviderName(providerSpotify.name);
                setProviderId(providers.spotify.id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProvider();
    }, [])

    return (
        <div className="bg-black flex items-center justify-center h-screen">
            <div className="">
                <img src="https://cdn.tgdd.vn/GameApp/3/220135/Screentshots/spotify-ung-dung-nghe-nhac-am-thanh-chat-luong-cao-logo-19-05-2020.png" alt="#spotify-logo" />
                <div className="mt-4">
                    <Button onClick={() => signIn(providerId, {
                        callbackUrl: '/'
                    })} fontSize='12px' size='tiny' color='white'>
                        Login with {providerName}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login
