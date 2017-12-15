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
    singleList: obj.singleList,
    singerList: obj.singerList,
    specialList: obj.specialList,
    playlist: obj.playlist,
    userList: obj.userList,
    mvList: obj.mvList,
    lyricList: obj.lyricList,
    radioList: obj.radioList,
    djprogramsList: obj.djprogramsList,
    userList: obj.userList

})

/**
 * 搜索歌曲
 * @param searchObj
 */
export const search = searchObj => dispatch => {
    const me = this;
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
    var obj = {};
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
                    switch (searchObj.type) {
                        case 1:
                            eachSearchWord.call(me, json.result.songs, searchObj.searchWord);
                            obj.singleList = json.result.songs;
                            break;
                        case 100:
                            eachSearchWord.call(me, json.result.artists, searchObj.searchWord);
                            obj.singerList = json.result.artists;
                            break
                        case 10:
                            eachSearchWord.call(me, json.result.albums, searchObj.searchWord);
                            obj.specialList = json.result.albums;
                            break;
                        case 1000:
                            eachSearchWord(me, json.result.playlists, searchObj.searchWord);
                            obj.playlist = json.result.playlists
                            break;
                        case 1002:
                            eachSearchWord(me, json.result.userprofiles, searchObj.searchWord);
                            obj.userList = json.result.userprofiles;
                            break;
                        case 1004:
                            eachSearchWord(me, json.result.mvs, searchObj.searchWord);
                            obj.mvList = json.result.mvs;
                            break;
                        case 1006:
                            eachSearchWord(me, json.result.songs, searchObj.searchWord);
                            obj.lyricList = json.result.songs;
                            break;
                        case 1009:
                            eachSearchWord(me, json.result.djRadios, searchObj.searchWord);
                            eachSearchWord(me, json.result.djprograms, searchObj.searchWord);
                            obj.radioList = json.result.djRadios; //主播电台
                            obj.djprogramsList = json.result.djprograms; //djprograms //单期节目
                            break;
                        case 1002:
                            eachSearchWord(me, json.result.djRadios, userprofiles.searchWord);
                            obj.userList = json.result.userprofiles; //用户列表
                            break;
                        default:

                    }

                    return dispatch(receiveSearchList(obj))
                }
            }
        )
}

const eachSearchWord = (obj, searchWord) => {

    if (Object.prototype.toString.call(obj) == '[object Object]') {

        for (let k in obj) {
            if (Object.prototype.toString.call(obj[k]) == "[object String]" && obj[k].indexOf(searchWord) > -1) {
                let re = new RegExp(searchWord, 'gim')
                obj[k] = obj[k].replace(re, '<span style="color:red">' + searchWord + '</span>')
            } else if (Object.prototype.toString.call(obj[k]) == '[object Array]') {
                for (let i = 0; i < obj[k].length; i++) {
                    eachSearchWord(obj[k][i], searchWord)
                }

            } else if (Object.prototype.toString.call(obj[k]) == "[object Object]") {
                eachSearchWord(obj[k], searchWord)
            }
        }

    } else if (Object.prototype.toString.call(obj) == '[object Array]') {
        for (let i = 0; i < obj.length; i++) {
            eachSearchWord(obj[i], searchWord)
        }

    }
}

/**
 *
 * @param switchInfo { type : 0, music_id:'' }
 * type -> 0,1 0表示视图 1表示歌词
 * music_id -> 歌曲id
 */
export const fetchLyric = (switchInfo) => dispatch => {
    const showType = switchInfo.showType,
        music_id = switchInfo.music_id;
    let obj = {};

    if(showType !=null && showType !=undefined && showType != ""){
        obj.showType=!showType
    }

    if(music_id){
        fetch('/api/song/lyric/' + music_id)
            .then(
                response => response.json()
            )
            .then(
                json => {
                    if (json.code === 200) {

                        let lyricStr = json.lrc.lyric || "",
                            reg = new RegExp("(\\[{1}[0-9]{2}:[0-9]{2}\.[0-9]{2,3}\]{1})","g");
                        let lyricArray = lyricStr.replace(reg,'=>$1=>').split('=>');
                        let lyricObjArray = [];
                        console.log(lyricArray)
                        for(let i = 1;i<lyricArray.length;i++){
                            if(i%2 != 0 && lyricArray[i+1].trim() !="" && lyricArray[i+1].trim()  != null){ //time
                                let timeArray = lyricArray[i].replace(/[\[\]]/g,"").split(':');
                                let time = parseInt(timeArray[0])*60+parseFloat(timeArray[1])
                                lyricObjArray.push({time:time.toFixed(3),text:lyricArray[i+1]})
                            }
                        }

                        let obj = {
                            lyric:json.lrc.lyric,
                            currentLyric:lyricObjArray
                        }

                        //dispatch(updateCurrentLyric(obj))


                        return dispatch(receiveLyric(obj));
                    }
                }
            )
    }else{
        return dispatch(receiveLyric(obj));
    }



}

export const updateCurrentLyric = (currentLyricObj) => ({
    type: types.UPDATE_CURRENT_LYRIC,
    currentLyric: currentLyricObj.currentLyric,
    currentLyricTime: currentLyricObj.currentLyricTime
})

export const receiveLyric = (obj) => ({
    type: types.RECEIVE_LYRIC,
    showType: obj.showType,
    lyric: obj.lyric,
    currentLyric:obj.currentLyric,
    currentLyricTime: obj.currentLyricTime
})

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
                    return dispatch(receivePlaylistDetail(json.playlist))
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

export const changeTopMenu = (obj) =>({
    type : types.CHANGE_TOP_MENU,
    firstLevel:obj.firstLevel,
    secondLevel:obj.secondLevel
})


