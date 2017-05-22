import * as types from '../constants/ActionTypes';
import {fetchLyric} from './index'

export const changeCurrentPlay = (playObject) => ({
    type : types.CHANGE_CURRENT_PLAY,
    isPlay:playObject.isPlay,
    playlist:playObject.playlist,
    currentPlayId:playObject.currentPlayId,
    currentPlay:playObject.currentPlay,
    currentTime:playObject.currentTime,
    currentTimeStr:playObject.currentTimeStr,
    duration:playObject.duration,
    durationStr:playObject.durationStr,
    mp3Url:playObject.mp3Url
})



export const fetchCurrentPlay = (playObj)  => dispatch =>{
    let ids = [playObj.currentPlayId]
    let url = '/api/song/getMp3'
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: 'ids=' + JSON.stringify(ids)
    })
        .then(
            response => response.json()
        )
        .then(
            json => {
                if (json.code === 200) {
                    playObj.mp3Url=json.data[0].url
                     dispatch(changeCurrentPlay(playObj, json))
                    dispatch(fetchLyric({music_id:playObj.currentPlayId}))
                }
            }
        )



}