import {
    CHANGE_CURRENT_PLAY
} from '../constants/ActionTypes'

export const changeCurrentPlay = (state={ isPlay:false }, action) => {
    switch (action.type) {
        case CHANGE_CURRENT_PLAY:
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
                duration:action.duration
            }
        default:
            return state
    }
}