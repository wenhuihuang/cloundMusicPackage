import React, { Component } from 'react'
import { connect } from 'react-redux'
import  utils  from '../../utils/utils'
import PlayViewPageStyle from './PlayViewPage.scss'
import { changeCurrentPlay } from '../../actions/playController'
import { changeIsShowPlayView } from '../../actions/index'

class PlayViewPage extends Component{

    componentDidUpdate(){
        const { isShowPlayView } = this.props
        if(isShowPlayView){
            var body = document.querySelector('body')
            body.style.overflow='hidden';
        }else{
            var body = document.querySelector('body')
            body.style.overflow='auto';
        }
    }

    switchPlay(){
        const { currentPlay, isPlay, dispatch } = this.props
        if(!isPlay){
            this.play()
        }else{
            this.pause()
        }
        dispatch(changeCurrentPlay(currentPlay,!isPlay))
    }

    play(){
        let audio = document.getElementById('audio')
        audio.play()
    }

    pause(){
        let audio = document.getElementById('audio')
        audio.pause()
    }

    back () {
        const {  dispatch } = this.props
        dispatch(changeIsShowPlayView(false))
    }

    render(){
        const { isPlay, isShowPlayView } = this.props
        return(
            <div className={ isShowPlayView ? "playViewShow" : "playViewHide" }>
                {
                    //isShowPlayView == true &&
                    <div className="play-view">
                        <div className="header">
                            <div className="header-back" onClick={this.back.bind(this)}>
                                <span className="iconfont icon">&#xe675;</span>
                            </div>
                            <div className="header-title">
                                哈哈
                            </div>
                            <div className="header-right">

                            </div>
                        </div>
                        <div className="play-view-bg"  style={utils.setStyle({background:"url(http://p1.music.126.net/zXuNaT1llCWCeQi08y0Vcg==/18719185464749718.jpg) no-repeat left top"})}></div>
                        {/*碟区*/}
                        <div className="disk-view-content-wrapper">
                            <div className={isPlay ? 'play-controller-icon-rotate' : 'play-controller-icon'}></div>
                            <div className="disk-view-content disk-view-content-active">
                                <img src="http://p1.music.126.net/zXuNaT1llCWCeQi08y0Vcg==/18719185464749718.jpg" alt=""/>
                                <div className="disk-content-background"></div>
                            </div>
                        </div>
                        {/*控控制区*/}
                        <div className="play-view-controller">
                            <div className="controller-top">
                                <div className="item">
                                    <span className="icon iconfont">&#xe613;</span>
                                </div>
                                <div className="item">
                                    <span className="icon iconfont">&#xe64c;</span>
                                </div>
                                <div className="item">
                                    <span className="icon iconfont">&#xe605;</span>
                                </div>
                                <div className="item">
                                    <span className="icon iconfont">&#xe766;</span>
                                </div>
                            </div>
                            <div className="controller-middle">
                                <div className="item used-time">
                                    <span>00:00</span>
                                </div>
                                <div className="item progress-wrapper">
                                    <span className="progress-icon"></span>
                                    <div className="progress-bar"></div>
                                </div>
                                <div className="item all-time">
                                    <span>00:00</span>
                                </div>
                            </div>
                            <div className="controller-bottom">
                                <div className="item">
                                    <span className="icon iconfont">&#xe63f;</span>
                                </div>
                                <div className="item">
                                    <span className="icon iconfont">&#xe6c9;</span>
                                </div>
                                <div className="item">

                                    {
                                        isPlay ? (<span className="icon iconfont" onClick={this.switchPlay.bind(this)}>&#xe696;</span>) : (<span className="icon iconfont " onClick={this.switchPlay.bind(this)}>&#xe601;</span>)
                                    }

                                    {/*<span className="icon iconfont"  onClick={this.switchPlay.bind(this)}>&#xe601;</span>*/}
                                </div>
                                <div className="item">
                                    <span className="icon iconfont">&#xe6c8;</span>
                                </div>
                                <div className="item">
                                    <span className="icon iconfont">&#xe92a;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

        )
    }

}

export default PlayViewPage