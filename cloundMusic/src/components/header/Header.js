import React from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router'
import { changeIsShowLeftMenu } from '../../actions/index'
import HeaderStyle from './Header.scss'

export default class Header extends React.Component {

    showMenu() {
        const { dispatch } = this.props
        dispatch(changeIsShowLeftMenu(true))
    }

    

    render() {
        return (
            <div className="header">
                {/* <div className="header-left-menu" onClick={this.showMenu.bind(this)}><span className="icon iconfont">&#xe61f;</span></div> */}
                <div className="header-menu">
                    <div className="search-input-wrapper">
                        <Link to={'/search'}>
                            <span className="icon iconfont">&#xe8e0;</span>
                            <input type="button" className='search-input' value='搜索音乐、视频、歌词、电台' />
                        </Link>
                    </div>
                    {/* <div className="me-music"><span className="icon iconfont">&#xe65d;</span></div>
                    <div className="online-music"><Link to={"/playlist/list"}><span className="icon iconfont">&#xe602;</span></Link></div>
                    <div className="share"><span className="icon iconfont">&#xe646;</span></div> */}
                </div>
                {/* <div className="header-search"><Link to={'/search'}><span className="icon iconfont">&#xe8e0;</span></Link></div> */}
            </div>

        );
    }
}