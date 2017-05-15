import React, { Component, PropTypes } from "react"
import { changeCurrentPlay as changeCurrentPlayFn } from '../../actions/playController'
import { changeIsShowPlayView } from '../../actions/index'
import { Link } from 'react-router'

import PlayControllerStyle from './PlayController.scss'

class PlayController extends Component{

    componentDidMount(){
        this.circle = document.querySelector('#circle-progress');
        this.line = document.querySelector('#line');
        this.viewProgress = document.querySelector('.progress-wrapper');
        this.viewProgress_width = parseInt(getComputedStyle(this.viewProgress).width);
    }

    componentDidUpdate () {
        const { changeCurrentPlay } = this.props
        if(changeCurrentPlay.isPlay){
            let audio = document.getElementById('audio')
           // audio.src=changeCurrentPlay.currentPlay.mp3Url
            audio.play()
        }
    }

    switchPlay(){
        const { changeCurrentPlay, dispatch } = this.props
        if(!changeCurrentPlay.isPlay){
            this.play()
        }else{
            this.pause()
        }
        let playObj = {
            ...changeCurrentPlay,
            isPlay:!changeCurrentPlay.isPlay
        }
        dispatch(changeCurrentPlayFn(playObj))
    }

    play(){
        let audio = document.getElementById('audio')
        audio.play()
    }

    pause(){
        let audio = document.getElementById('audio')
        audio.pause()
    }

    showPlayView(){
        const { dispatch } = this.props
        dispatch(changeIsShowPlayView(true))
    }

    onTimeUpdate(){
        const { changeCurrentPlay, dispatch } = this.props;
        const audio = document.getElementById('audio');
        let playObj = {
            ...changeCurrentPlay,
            currentTime:audio.currentTime,
            duration:audio.duration,
        }
        dispatch(changeCurrentPlayFn(playObj))
        let progress = audio.currentTime * 100 / audio.duration || 0
        this.setSvg(progress)
    }

    setSvg(progress){

        if (this.circle) {
            let percent = progress / 100, perimeter = Math.PI * 2 * 160;
            this.circle.setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1- percent));
        }else{
            this.circle = document.querySelector('#circle-progress');
        }
        if(this.viewProgress){
            let percent = progress / 100, perimeter = this.viewProgress_width;
            this.line.setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1- percent));
        }else{
            this.line = document.querySelector('#line');
            this.viewProgress = document.querySelector('.progress-wrapper');
            this.viewProgress_width = parseInt(getComputedStyle(this.viewProgress).width);
        }
    }

    render(){
        const {changeCurrentPlay} = this.props
        const currentPlay = changeCurrentPlay.currentPlay
        return (
            <div className="play-controller-wrap" >
                {
                    currentPlay &&

                    <div className="play-controller">
                        <a href="javascript:;" onClick={this.showPlayView.bind(this)}>
                            <div className="cover-img"><img src={currentPlay.album.picUrl} /></div>
                            <div className="play-name">
                                <p>{currentPlay.name}</p>
                                <p>{currentPlay.artists[0].name}</p>
                            </div>
                        </a>

                        <div className="play-btn" onClick={this.switchPlay.bind(this)}>

                            <svg width="42" height="42" viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="220" cy="220" r="160" strokeWidth="5" stroke="#4A4A4A" fill="none"></circle>
                                <circle id="circle-progress" cx="220" cy="220" r="160" strokeWidth="5" stroke="red" fill="none" transform="matrix(0,-1,1,0,0,440)" strokeDasharray="0 1069"></circle>
                            </svg>
                            {
                                changeCurrentPlay.isPlay ? (<span className="icon iconfont">&#xe654;</span>) : (<span className="icon iconfont ">&#xe671;</span>)
                            }

                        </div>


                        <div className="play-list"><span className="icon iconfont">&#xe600;</span></div>
                        <audio onTimeUpdate={this.onTimeUpdate.bind(this)} id="audio" src={currentPlay.mp3Url} >您的浏览器不支持 audio 标签。</audio>
                    </div>

                }




            </div>
        )
    }

}

export default PlayController