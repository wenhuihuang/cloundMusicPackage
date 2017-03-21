import { combineReducers } from 'redux';
import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';

export const activeItem = classify => ({
    type : types.ACTIVE_ITEM,
    classify
})

export const receiveMusics = (classify, json) => ({
    type : types.RECEIVE_MUSICS,
    classify,
    musics : json

})

const changeDidInvalidate = (obj) => ({
    type : types.CHANGE_DID_INVALIDATE,
    musics: obj
})

const fetchMusics = ( classify, offset, limit ) => dispatch => {
    let url = '/api/newAlbumsList/'+offset+'/'+limit
    return fetch(url)
        .then(
            response => response.json()
        )
        .then(
            json => {
                //设置当前offset
                json.offset=offset
                if(json.code === 200){
                    json.didInvalidate = false;
                    return dispatch(receiveMusics(classify,json))
                }
            }
        )




}



const getListOffset = (state, classify,limit) => {
    let classifyObj = state.receiveMusics[classify]
    let more=false
    let offset = 0
    if(classifyObj == null || classifyObj == undefined){
        more = true
        offset = 0
    }else{
        more = classifyObj.more
        offset = classifyObj.offset + limit
    }


    if( more ){
        return offset
    }else{
        return
    }

    console.log(state.receiveMusics[classify])
}

/**
 * middleware 的函数签名是 ({ getState, dispatch }) => next => action
 * @param music
 */

export const fetchMusicesList = ( classify) => (dispatch,getState) => {
    const classifyObj = getState().receiveMusics[classify] || {}
    if(!classifyObj.didInvalidate){
        //设置成禁用
            classifyObj.didInvalidate = true;
            dispatch(changeDidInvalidate(classifyObj))


        let limit = 50
        let offset = getListOffset(getState(),classify,limit)
        return dispatch(fetchMusics(classify, offset, limit ))
    }


}