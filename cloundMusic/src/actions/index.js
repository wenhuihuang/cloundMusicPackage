import { combineReducers } from 'redux';
import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';
import * as Vibrant from 'node-vibrant'
import utils from '../utils/utils'

export const activeItem = classify => ({
    type : types.ACTIVE_ITEM,
    classify
})

export const receiveMusics = (classify, json) => ({
    type : types.RECEIVE_MUSICS,
    classify,
    musics : json

})

export const changeDidInvalidate = (obj) => ({
    type : types.CHANGE_DID_INVALIDATE,
    musics: obj
})


export const receivePlaylistDetail = result => ({
    type : types.RECEIVE_PLAYLIST_DETAIL,
    detail : result
})

//获取歌曲列表
const fetchMusics = ( classify, offset, limit ) => dispatch => {
    let url = '/api/playlist/list/'+offset+'/'+limit
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

//获取歌曲详情
const fetchMusicDetail = (playlistDetail) => (dispatch, getState) => {
    return fetch('/api/playlist/detail/'+playlistDetail.routeParams.playlist_id)
            .then(
                response => response.json()
            )
            .then(
                json => {
                    if(json.code === 200){
                      //  var url = utils.getProxy()+'/'+json.tempBg
                     //   console.log(url)
                      //  Vibrant.from(url).getPalette((err, palette) => {
                            //document.getElementsByTagName('body')[0].style.background='rgb('+palette.DarkVibrant._rgb.join()+')' ;
                            // console.log(palette)
                          //  json.result.rgb=palette.Muted._rgb.join()
                           // json.result.localCoverImgUrl=url
                            return dispatch(receivePlaylistDetail(json.result))
                       // })


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


        let limit = 20
        let offset = getListOffset(getState(),classify,limit)
        return dispatch(fetchMusics(classify, offset, limit ))
    }


}

//获取歌单详情
export const fetchPlaylistDetail = (playlistDetail) => (dispatch, getState) => {
    return dispatch(fetchMusicDetail(playlistDetail))
}