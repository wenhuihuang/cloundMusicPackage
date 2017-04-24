import React from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router'
import OnlineMenuStyle from './OnlineMenu.scss'

export default class OnlineMenu extends React.Component {
    render () {
        return (
            <div className="online-menu">
                <div className="item">个性推荐</div>
                <div className="item"><Link to={"/playlist/list"}>歌单</Link></div>
                <div className="item">主播电台</div>
                <div className="item">排行榜</div>
            </div>

        )
    }
}