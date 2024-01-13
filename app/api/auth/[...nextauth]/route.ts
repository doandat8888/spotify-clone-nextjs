import NextAuth, { CallbacksOptions } from "next-auth"
import SpotifyWebApi from "spotify-web-api-node"
import SpotifyProvider from "next-auth/providers/spotify"
import ConfigSpotifyApi from '../../../config/spotify';
import ExtendedToken, { TokenError } from "@/types";
import spotify from "../../../config/spotify";

const refreshAccessToken = async (token: ExtendedToken): Promise<ExtendedToken> => {
    try {
        spotify.spotifyApi.setAccessToken(token.accessToken);
        spotify.spotifyApi.setRefreshToken(token.refreshToken);

        const {body: refreshedToken} = await spotify.spotifyApi.refreshAccessToken();

        console.log('REFRESHED ACCESS TOKEN: ', refreshedToken);
        return {
            ...token,
            accessToken: refreshedToken.access_token,
            refreshToken: refreshedToken.refresh_token || token.refreshToken,
            accessTokenExpiresAt: Date.now() + refreshedToken.expires_in * 1000
        }
    } catch (error) {
        console.log(error);
        return {
            ...token,
            error: TokenError.RefreshTokenError
        }
    }
    
}

const jwtCallback: CallbacksOptions['jwt'] = async({token, user, account}) => {
    let extendedToken: ExtendedToken
    if(account && user) {
        extendedToken = {
            ...token,
            accessToken: account.access_token as string,
            refreshToken: account.refresh_token as string,
            accessTokenExpiresAt: ( account.expires_at as number ) * 1000,
            user: user
        };
        return extendedToken; 
        //When return, extendedToken will be assigned for 'token' variable, so when we refresh, 
        //although user and account will be undefined but we has assigned all of it for 'token' variable
    }

    if(Date.now() + 5000 < (token as unknown as ExtendedToken).accessTokenExpiresAt) {
        console.log('ACCESS TOKEN STILL VALID, RETURNING EXTENDED TOKEN...');
        console.log(token);
        return token;
    }

    console.log('TOKEN EXPIRED, REFRESHING...');
    console.log('Token: ', token)
    return await refreshAccessToken(token as unknown as ExtendedToken);
}

const sessionCallback: CallbacksOptions['session'] = async({session, token}) => {
    session.accessToken = (token as ExtendedToken).accessToken
    session.error = (token as ExtendedToken).error
    return session;
}

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
            authorization: {
                url: 'https://accounts.spotify.com/authorize',
                params: {
                    scope: ConfigSpotifyApi.scopes
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        jwt: jwtCallback,
        session: sessionCallback
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
