import React from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router'
import OnlineMenuStyle from './OnlineMenu.scss'
import { browserHistory } from 'react-router'
import {changeTopMenu} from '../../actions/index'


export default class OnlineMenu extends React.Component {

    handleMenuClick(patch,type){
        const {topMenu,dispatch} = this.props;
        browserHistory.push("/cloundMusic"+patch);
        dispatch(changeTopMenu({firstLevel:"onLineMusic",secondLevel:type}))
    }

    render () {
        const {topMenu} = this.props;
        return (
            <div className="online-menu">
                <div className={topMenu.secondLevel == "recommend" ? "item active" : "item"} onClick={this.handleMenuClick.bind(this,"/playlist/list","recommend")}>个性推荐</div>
                <div className={topMenu.secondLevel == "playlist" ? "item active" : "item"} onClick={this.handleMenuClick.bind(this,"/playlist/list","playlist")}>歌单</div>
                <div className={topMenu.secondLevel == "radio" ? "item active" : "item"} onClick={this.handleMenuClick.bind(this,"/playlist/list","radio")}>主播电台</div>
                <div className={topMenu.secondLevel == "rankingList" ? "item active" : "item"} onClick={this.handleMenuClick.bind(this,"/playlist/list","rankingList")}>排行榜</div>
            </div>

        )
    }
}