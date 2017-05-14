import * as types from '../constants/ActionTypes'

export const changeCurrentPlay = (playObject) => ({
    type : types.CHANGE_CURRENT_PLAY,
    isPlay:playObject.isPlay,
    playlist:playObject.playlist,
    currentPlayId:playObject.currentPlayId,
    currentPlay:playObject.currentPlay,
    currentTime:playObject.currentTime,
    duration:playObject.duration
})



export const fetchCurrentPlay = (music_id)  => dispatch =>{
    return fetch('/api/song/detail/'+music_id)
        .then(
            response => response.json()
        )
        .then(
            json => {
                if(json.code === 200){
                    const songDetail = json.songs[0]
                    return dispatch(changeCurrentPlay(songDetail,true))
                }
            }
        )
}