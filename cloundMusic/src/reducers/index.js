import { combineReducers } from 'redux';
import {
    RECEIVE_MUSICS,
    ACTIVE_ITEM,
    CHANGE_DID_INVALIDATE
} from '../constants/ActionTypes';

const activeItem = (state = 'all',action) => {
    switch (action.type){
        case ACTIVE_ITEM :
            return action.classify;
        default:
            return state;
    }
}

const musics = (state = {
    more : false,
    didInvalidate : false, //做无效
    offset : 0,
    items : []
}, action) => {
    switch (action.type){
        case RECEIVE_MUSICS:
            return {
                ...state,
                more : action.musics.more,
                offset : action.musics.offset,
                didInvalidate : action.musics.didInvalidate,
                items : state.items.concat(action.musics.playlists)
            }
        case CHANGE_DID_INVALIDATE:
            return {
                ...state,
                didInvalidate : action.musics.didInvalidate
            }

    }

}

const receiveMusics = (state = {  }, action) => {
    switch (action.type) {
        case RECEIVE_MUSICS:
            return {
                ...state,
                [action.classify] : musics(state[action.classify],action)
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    receiveMusics, //歌曲列表信息 全局对象state上面的receiveMusices
    activeItem //当前激活的选项 全局对象state上面的activeItem
})

export default rootReducer