import React from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router'
import OnlineMenuStyle from './OnlineMenu.scss'
import { browserHistory } from 'react-router'
import {changeTopMenu} from '../../actions/index'


export default class OnlineMenu extends React.Component {

    handleMenuClick(patch,type){
        const {topMenu,dispatch} = this.props;
        browserHistory.push(patch);
        dispatch(changeTopMenu({firstLevel:"onLineMusic",secondLevel:type}))
    }

    render () {
        const {topMenu} = this.props;
        return (
            <div className="online-menu">
                <div className={topMenu.secondLevel == "recommend" ? "item active" : "item"} onClick={this.handleMenuClick.bind(this,"/playlist/list","recommend")}>音乐</div>
                <div className={topMenu.secondLevel == "playlist" ? "item active" : "item"} onClick={this.handleMenuClick.bind(this,"/playlist/list","playlist")}>视频</div>
                <div className={topMenu.secondLevel == "radio" ? "item active" : "item"} onClick={this.handleMenuClick.bind(this,"/playlist/list","radio")}>电台</div>
                {/* <div className={topMenu.secondLevel == "rankingList" ? "item active" : "item"} onClick={this.handleMenuClick.bind(this,"/playlist/list","rankingList")}>排行榜</div> */}
            </div>

        )
    }
}