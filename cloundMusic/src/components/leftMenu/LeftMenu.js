import React, { Component, PropTypes } from "react"
import { changeIsShowLeftMenu, login } from '../../actions/index'
import { Link } from 'react-router'
import LeftMenuStyle from './LeftMenu.scss'

class LeftMenu extends Component{

    hideLeftMenu (){
        const { dispatch } = this.props
        dispatch(changeIsShowLeftMenu(false))
    }

    login() {
        // const { dispatch } = this.props
        // let obj = {
        //     username :
        // }
        // dispatch(login())
    }

    render (){
        const { isShow } = this.props
        console.log(isShow)
        return (
            <div className="left-menu-wrapper">
                <div className={ isShow ? "left-menu-active" : "left-menu"}>
                    <div className="menu-top">
                        <Link to={"/login"} className="login-btn" onClick={this.login.bind(this)}>立即登录</Link>
                    </div>
                </div>
                <div className={ isShow ? "left-menu-wrapper-pop-active" : "left-menu-wrapper-pop" } onClick={this.hideLeftMenu.bind(this)}></div>
            </div>
        )
    }
}

export default LeftMenu