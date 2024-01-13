import { SongContextState, SongReducerAction, SongReducerActionType } from "@/types";

export const songReducer = (state: SongContextState, { type, payload }: SongReducerAction): SongContextState => {
    switch (type) {
        case SongReducerActionType.SetDevice:
            return {
                ...state,
                volume: payload.volume,
                deviceId: payload.deviceId
            }
        case SongReducerActionType.SetCurrentPlayingSong:
            const { selectedSongId, selectedSong, isPlaying } = payload;
            return {
                ...state,
                selectedSongId,
                selectedSong,
                isPlaying
            }
        default:
            return state;
    }
}