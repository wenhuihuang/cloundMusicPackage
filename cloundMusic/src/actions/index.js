import {combineReducers} from 'redux';
import fetch from 'isomorphic-fetch';
import md5 from 'md5'
import * as types from '../constants/ActionTypes';
import * as Vibrant from 'node-vibrant'
import utils from '../utils/utils'
import {SearchHistory} from '../utils/searchHistory';

export const activeItem = classify => ({
    type: types.ACTIVE_ITEM,
    classify
})

export const receiveMusics = (classify, json) => ({
    type: types.RECEIVE_MUSICS,
    classify,
    musics: json

})

export const changeDidInvalidate = (obj) => ({
    type: types.CHANGE_DID_INVALIDATE,
    musics: obj
})


export const receivePlaylistDetail = result => ({
    type: types.RECEIVE_PLAYLIST_DETAIL,
    detail: result
})

export const changeIsShowPlayView = isShowPlayView => ({
    type: types.CHANGE_IS_SHOW_PLAY_VIEW,
    isShowPlayView: isShowPlayView
})

//改变左边菜单
export const changeIsShowLeftMenu = isShowLeftMenu => ({
    type: types.CHANGE_IS_SHOW_LEFT_MENU,
    isShowLeftMenu: isShowLeftMenu
})

/**
 * 搜索歌曲
 * @param list
 */
export const receiveSearchList = obj =>({
    type: types.RECEIVE_SEARCH_LSIT,
    list : obj.list
})

/**
 * 搜索歌曲
 * @param searchObj
 */
export const search = searchObj => dispatch => {
    new SearchHistory().setSearchHistory(searchObj.searchWord)

    let data = {
        searchWord: searchObj.searchWord,
        stype: searchObj.type,
        offset: 0,
        limit: 60
    }

    var dataArray = []

    for (var k in data) {
        dataArray.push(k + '=' + data[k])
    }

    let url = '/api/search/get'
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: dataArray.join('&')
    })
        .then(
            response => response.json()
        )
        .then(
            json => {
                //设置当前offset
               // json.offset = offset
                if (json.code === 200) {
                    let list;
                    //搜索单曲(1)，歌手(100)，专辑(10)，歌单(1000)，用户(1002) MV(1004) 歌词(1006) 主播电台(1009) 用户(1002)
                    switch (searchObj.type){
                        case 1:
                            list = json.result.songs;
                            break;
                        case 100:
                            list = json.result.artists;
                            break
                        case 10:
                            list=json.result.albums;
                            break;
                        case 1002:
                            list=json.result.userprofiles;
                            break;
                        case 1004:
                            list=json.result.mvs;
                            break;
                        case 1006:
                            list=json.result.songs;
                            break;
                        case 1009:
                            
                        default:

                    }
                    var obj = {
                        list:list
                    }
                    return dispatch(receiveSearchList(obj))
                }
            }
        )
}

export const receiveToken = token => ({
    type: types.RECEIVE_TOKEN,
    token: token
})

export const login = (userInfo, dispatch) => {
    alert(userInfo.username)
    console.log(userInfo)
    console.log(md5(userInfo.password))
    let url = '/api/weapi/login/cellphone'
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: 'username=' + userInfo.username + '&password=' + userInfo.password
    })
        .then(
            response => response.json()
        )
        .then(
            json => {
                //设置当前offset
                if (json.code === 200) {
                    return dispatch(receiveMusics(classify, json))
                    console.log(json)
                }
            }
        )
}

//获取歌曲列表
const fetchMusics = (classify, offset, limit) => dispatch => {
    let url = '/api/playlist/list/' + offset + '/' + limit
    return fetch(url)
        .then(
            response => response.json()
        )
        .then(
            json => {
                //设置当前offset
                json.offset = offset
                if (json.code === 200) {
                    json.didInvalidate = false;
                    return dispatch(receiveMusics(classify, json))
                }
            }
        )
}

//获取歌曲详情
const fetchMusicDetail = (playlistDetail) => (dispatch, getState) => {
    return fetch('/api/playlist/detail/' + playlistDetail.routeParams.playlist_id)
        .then(
            response => response.json()
        )
        .then(
            json => {
                if (json.code === 200) {
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

const getListOffset = (state, classify, limit) => {
    let classifyObj = state.receiveMusics[classify]
    let more = false
    let offset = 0
    if (classifyObj == null || classifyObj == undefined) {
        more = true
        offset = 0
    } else {
        more = classifyObj.more
        offset = classifyObj.offset + limit
    }


    if (more) {
        return offset
    } else {
        return
    }

    console.log(state.receiveMusics[classify])
}

/**
 * middleware 的函数签名是 ({ getState, dispatch }) => next => action
 * @param music
 */

export const fetchMusicesList = (classify) => (dispatch, getState) => {
    const classifyObj = getState().receiveMusics[classify] || {}
    if (!classifyObj.didInvalidate) {
        //设置成禁用
        classifyObj.didInvalidate = true;
        dispatch(changeDidInvalidate(classifyObj))


        let limit = 20
        let offset = getListOffset(getState(), classify, limit)
        return dispatch(fetchMusics(classify, offset, limit))
    }


}

//获取歌单详情
export const fetchPlaylistDetail = (playlistDetail) => (dispatch, getState) => {
    return dispatch(fetchMusicDetail(playlistDetail))
}