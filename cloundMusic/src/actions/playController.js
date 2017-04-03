import * as types from '../constants/ActionTypes'

export const changeCurrentPlay = (currentPlay,isPlay=false) => ({
    type : types.CHANGE_CURRENT_PLAY,
    isPlay:isPlay,
    currentPlay
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