import {
    CHANGE_CURRENT_PLAY
} from '../constants/ActionTypes'

export const changeCurrentPlay = (state={  }, action) => {
    switch (action.type) {
        case CHANGE_CURRENT_PLAY:
            return{
                ...state,
                isPlay : action.isPlay,
                currentPlay:action.currentPlay
            }
        default:
            return state
    }
}