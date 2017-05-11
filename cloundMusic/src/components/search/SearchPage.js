import React, {Component} from 'react';
import {connect} from 'react-redux';
import {search, receiveSearchList, searchResult} from '../../actions/index';
import  './SearchPage.scss';
import {SearchHistory} from '../../utils/searchHistory';
import {browserHistory, Link} from 'react-router'

import Single  from './Single';
import Singer from './Singer';
import Special from './Special';
import Playlist from './Playlist';
import Mv from './Mv';
import RadioList from './RadioList'
import UserList from './UserList'

class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = {searchWord: "", type: 1, focus: false, historyList: []};
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.updateHistoryList = this.updateHistoryList.bind(this);
    }


    componentWillReceiveProps(nextProps) {


        // this.setState(Object.assign(this.state, {
        //     type: type,
        //     searchWord:this.state.searchWord
        // }))



        //dispatch(search(this.state))


    }

    //render 之前调用
    componentWillMount() {
        this.updateHistoryList()
    }


    componentWillUpdate(nextProps) {

    }

    componentDidUpdate(prevProps) {


        /**
         *调节分类菜单宽度
         *
         */
        let allWidth = 0;
        const search_type_item = document.querySelectorAll('.search-type-item');
        for (var i = 0; i < search_type_item.length; i++) {
            allWidth += parseFloat(getComputedStyle(search_type_item[i]).width)
            allWidth += parseFloat(getComputedStyle(search_type_item[i]).paddingLeft) * 2
        }
        const search_type_content = document.querySelector('.search-type-content')
        if (search_type_content != null && search_type_content != "" && search_type_content != undefined) {
            search_type_content.style.width = allWidth + 'px'
        }


        /**
         *标记搜索关键词
         */
        // const search_list_wrapper = document.querySelector('.search-list-wrapper')
        // if (search_list_wrapper != null && search_list_wrapper != "" && search_list_wrapper != undefined) {
        //     let search_list_wrapper_html = search_list_wrapper.innerHTML;
        //     let re = new RegExp(this.state.searchWord, 'gim')
        //     search_list_wrapper_html = search_list_wrapper_html.replace(re, '<span style="color:#5788ba">' + this.state.searchWord + '</span>')
        //     search_list_wrapper.innerHTML = search_list_wrapper_html;
        // }


    }


    handleChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value.trim(),
            focus: true
        })
    }

    handleSearch(event) {
        const {dispatch} = this.props;
        this.setState(Object.assign(this.state, {
            focus: false
        }))
        dispatch(search(this.state))
        event.preventDefault();
    }

    handleChangeSearchType(type) {
        const {dispatch} = this.props;
        let obj = Object.assign(this.state, {type: type})
        this.setState(obj)
        dispatch(search(this.state))
    }

    handleFocus(bool) {
        this.setState(Object.assign(this.state, {
            focus: bool
        }))
        //alert('focus')
    }

    handleHistorySearch(word) {
        const {dispatch} = this.props;
        let obj = Object.assign(this.state, {searchWord: word, type: 1})
        this.setState(obj)

        dispatch(search(this.state))
    }

    handleDelHistory(value) {
        new SearchHistory().del(value);
        this.updateHistoryList()

    }

    updateHistoryList() {
        const historyArray = new SearchHistory().getSearchHistory();
        this.setState({
            historyList: historyArray
        })
    }


    back() {
        history.back();
    }


    render() {
        const {singleList,singerList,specialList,playlist,mvList,radioList,djprogramsList,userList, children, ele} = this.props;
        const list = singleList || singerList
        const historyArray = new SearchHistory().getSearchHistory();


        return (
            <div className="search-page">
                <div className="search-page-header">
                    <div className="header-back" onClick={this.back}>
                        <span className="iconfont icon">&#xe675;</span>
                    </div>
                    <div className="search-input-wrapper">
                        <form action="" onSubmit={this.handleSearch}>
                            <input className="search-input" name="searchWord" type="text" placeholder="搜索音乐、歌手、歌词、用户"
                                   onChange={this.handleChange} onBlur={this.handleFocus.bind(this, false)}
                                   onFocus={this.handleFocus.bind(this, true)}/>
                        </form>
                    </div>
                </div>
                {/*搜索结果列表框*/}
                {


                    singleList.length > 0 || singerList.length>0 || specialList.length>0 || playlist.length>0 || mvList.length>0 || radioList.length>0 || djprogramsList.length>0 || userList.length>0 ?

                        <div className="search-result-list">

                            <div className="search-type-wrapper">
                                <div className="search-type-content">
                                    <div
                                        className={this.state.type == 1 ? "search-type-item-active search-type-item" : "search-type-item"}
                                        onClick={this.handleChangeSearchType.bind(this, 1)}>单曲
                                    </div>
                                    <div className={this.state.type == 100 ? "search-type-item-active search-type-item" : "search-type-item"}
                                         onClick={this.handleChangeSearchType.bind(this, 100)}>歌手
                                    </div>
                                    <div className={this.state.type == 10 ? "search-type-item-active search-type-item" : "search-type-item"}
                                         onClick={this.handleChangeSearchType.bind(this, 10)}>专辑
                                    </div>
                                    <div className={this.state.type == 1000 ? "search-type-item-active search-type-item" : "search-type-item"}
                                         onClick={this.handleChangeSearchType.bind(this, 1000)}>
                                        歌单
                                    </div>
                                    <div className={this.state.type == 1004 ? "search-type-item-active search-type-item" : "search-type-item"}
                                         onClick={this.handleChangeSearchType.bind(this, 1004)}>
                                        MV
                                    </div>
                                    <div className={this.state.type == 1006 ? "search-type-item-active search-type-item" : "search-type-item"}
                                         onClick={this.handleChangeSearchType.bind(this, 1006)}>
                                        歌词
                                    </div>
                                    <div className={this.state.type == 1009 ? "search-type-item-active search-type-item" : "search-type-item"}
                                         onClick={this.handleChangeSearchType.bind(this, 1009)}>
                                        主播电台
                                    </div>
                                    <div className={this.state.type == 1002 ? "search-type-item-active search-type-item" : "search-type-item"}
                                         onClick={this.handleChangeSearchType.bind(this, 1002)}>
                                        用户
                                    </div>
                                </div>
                            </div>

                            <div className="search-list-wrapper">

                                {
                                    (()=>{
                                        switch (parseInt(this.state.type)) {
                                            case 1:
                                                return <Single list={singleList} />
                                                break;
                                            case 100:
                                                return <Singer list={singerList} />
                                                break;
                                            case 10:
                                                return <Special list={specialList} />
                                                break;
                                            case 1000:
                                                return <Playlist list={playlist} />
                                                break;
                                            case 1004:
                                                return <Mv list={mvList} />
                                                break;
                                            case 1009:
                                                return <RadioList radioList={radioList} djprogramsList={djprogramsList} />
                                                break;
                                            case 1002:
                                                return <UserList list={userList} />
                                                break;
                                            default:
                                        }
                                    })()
                                }
                            </div>
                        </div>
                        :
                        <div className="search-result-list">
                            {
                                historyArray.map((item, i)=>
                                    <div key={i} className="history-list">
                                        <span className="icon iconfont">&#xe63b;</span>
                                        <div className="list-right">
                                            <div className="history-word"
                                                 onClick={this.handleHistorySearch.bind(this, item)}>{item}</div>
                                            <span onClick={this.handleDelHistory.bind(this, item)}
                                                  className="icon iconfont">&#xe6f5;</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                }

                {/*搜索框*/}
                {ele}
                {
                    this.state.searchWord != null && this.state.searchWord != "" && this.state.focus &&
                    <div className="search-content-list">
                        <ul>
                            <li className="item" onClick={this.handleSearch}><label
                                htmlFor="">搜索</label><span>{'"' + this.state.searchWord + '"'}</span></li>
                        </ul>
                    </div>
                }
                {children}

            </div>
        )
    }
}

const mapStateToProps = state => {
    const {receiveSearchList} = state;
    const singleList = receiveSearchList.singleList || []
    const singerList = receiveSearchList.singerList || []
    const specialList = receiveSearchList.specialList || []
    const playlist = receiveSearchList.playlist || []
    const mvList = receiveSearchList.mvList || []
    const radioList = receiveSearchList.radioList || [];
    const djprogramsList = receiveSearchList.djprogramsList || []
    const userList = receiveSearchList.userList || []

    return {
        singleList,
        singerList,
        specialList,
        playlist,
        mvList,
        radioList,
        djprogramsList,
        userList
    }
}


export default connect(mapStateToProps)(SearchPage)

