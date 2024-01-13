import { Session } from "inspector";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Dispatch } from "react";

export enum TokenError {
    RefreshTokenError = 'RefreshTokenError'
}

export default interface ExtendedToken extends JWT {
    accessToken: string,
    refreshToken: string,
    accessTokenExpiresAt: number,
    user: User
    error?: TokenError
}

export default interface ExtendedSession extends Session {
    accessToken: string,
    error?: ExtendedToken['error']
}

export interface PlaylistContextState {
    playlists: any[] | Playlist[],
    selectedPlaylistId: string | null,
    selectedPlaylist: SpotifyApi.SinglePlaylistResponse | null
}

export interface IPlaylistContext {
    playlistContextState: PlaylistContextState,
    updatePlaylistContextState: (updatedObj: Partial<PlaylistContextState>) => void
}

export interface Playlist {
    collaborative: boolean,
    description: string,
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    images: Image[]
    name: string,
    owner: {
        display_name: string,
        external_urls: {
            spotify: string
        },
        href: string,
        id: string,
        type: string,
        uri: string
    },
    primary_color?: string,
    public: boolean,
    snapshot_id: string,
    tracks: {
        href: string,
        total: number
    },
    type: string,
    uri: string

}

export interface Image {
    height: number,
    url: string,
    width: number
}

export type Song = SpotifyApi.PlaylistTrackObject & {
    isPlaying?: boolean
}

/* Song */
export interface SongContextState {
    selectedSongId: string,
    selectedSong: any | null,
    isPlaying: boolean,
    volume: number,
    deviceId: string | null
}

export interface ISongContext {
    songContextState: SongContextState,
    dispatchSongAction: Dispatch<SongReducerAction>
}

export enum SongReducerActionType {
    SetDevice = 'SetDevice',
    ToggleIsPlaying = 'ToggleIsPlaying',
    SetCurrentPlayingSong = 'SetCurrentPlayingSong',
    SetVolume = 'SetVolume'
}

export type SongReducerAction =
    | {
        type: SongReducerActionType.SetDevice
        payload: Pick<SongContextState, 'volume' | 'deviceId'> //Lay propety cua SongContextState <=> volume: number, deviceId: string
    }
    | {
        type: SongReducerActionType.SetCurrentPlayingSong
        payload: Pick<
            SongContextState,
            'selectedSongId' | 'selectedSong' | 'isPlaying'
        >
    }