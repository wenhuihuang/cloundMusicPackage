import {
    CHANGE_CURRENT_PLAY
} from '../constants/ActionTypes'

const getPlaylist = () => {
    JSON.parse(window.localStorage.setItem('playlist'))
}

const getCurrentPlay = () =>{

}



export const changeCurrentPlay = (state={ isPlay:false,currentTime:0,currentTimeStr:'00:00',duration:0,durationStr:'00:00' }, action) => {
    switch (action.type) {
        case CHANGE_CURRENT_PLAY:
            if(action.playlist &&　action.playlist.length>0){
                window.localStorage.setItem('playlist',JSON.stringify(action.playlist))
            }
            return{
                ...state,
                isPlay : action.isPlay,
                currentPlayId:action.currentPlayId,
                currentPlay:(
                    (id,list) =>{
                        if(id&&list)
                        for(var i =0; i < list.length;i++){
                            if(id == list[i].id){
                                return list[i]
                            }
                        }
                    }
                )(action.currentPlayId,action.playlist),
                playlist:action.playlist,
                currentTime:action.currentTime,
                currentTimeStr:parseTime(action.currentTime),
                duration:action.duration,
                durationStr:parseTime(action.duration),
                mp3Url:action.mp3Url
            }
        default:
            return state
    }
}

const parseTime = (t) => {
    let arr = [];
    const m = parseInt(t/60) || 0,
        mStr = ("00"+m).substring((""+m).length),
        s = Math.round(((t/60)-parseInt(t/60))*60) || 0,
        sStr = ("00"+s).substring((""+s).length);
    arr.push(mStr);
    arr.push(sStr);
    return arr.join(':')
}