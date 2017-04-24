import React, { Component } from 'react'
import SearchStyle from './SearchPage.scss'

class SearchPage extends Component{

    back(){

    }

    render(){
        return(
            <div className="search-page">
                <div className="search-page-header">
                    <div className="header-back" onClick={this.back.bind(this)}>
                        <span className="iconfont icon">&#xe675;</span>
                    </div>
                    <div className="search-input-wrapper">
                        <input className="search-input" type="text" placeholder="搜索音乐、歌手、歌词、用户"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchPage