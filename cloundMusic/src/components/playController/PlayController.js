import React, { Component, PropTypes } from "react"
import { changeCurrentPlay as changeCurrentPlayFn ,fetchCurrentPlay} from '../../actions/playController'
import { changeIsShowPlayView,receiveLyric as receiveLyricFn } from '../../actions/index'
import { Link } from 'react-router'

import PlayControllerStyle from './PlayController.scss'

class PlayController extends Component{

    constructor(props){
        super(props)
        this.handleEnded=this.handleEnded.bind(this)
    }

    componentDidMount(){
        this.circle = document.querySelector('#circle-progress');
        this.line = document.querySelector('#line');
        this.viewProgress = document.querySelector('.progress-wrapper');
       
    }

    componentDidUpdate () {
        const { changeCurrentPlay } = this.props
        this.viewProgress_width = parseInt(getComputedStyle(this.viewProgress).width);
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
        const { changeCurrentPlay,receiveLyric, dispatch } = this.props;
        const audio = document.getElementById('audio');

        let playObj = {
            ...changeCurrentPlay,
            currentTime:audio.currentTime,
            duration:audio.duration,
        }
        dispatch(changeCurrentPlayFn(playObj))
        let progress = audio.currentTime * 100 / audio.duration || 0
        this.setSvg(progress)

        let lyricStr = receiveLyric.lyric || "",
            reg = new RegExp("(\\[{1}[0-9]{2}:[0-9]{2}\.[0-9]{2,3}\]{1})","g");
        let lyricArray = lyricStr.replace(reg,'=>$1=>').split('=>');
        let lyricObjArray = [];
        let currentTimeS = (
            (t) => {
                return t.toFixed(3)
            }
        )(audio.currentTime)
        for(let i = 1;i<lyricArray.length;i++){
            if(i%2 != 0){ //time
                let timeArray = lyricArray[i].replace(/[\[\]]/g,"").split(':');
                let time = parseInt(timeArray[0])*60+parseFloat(timeArray[1])
                if(currentTimeS>=time){
                    let obj = {
                        currentLyricTime:time,
                        showType:receiveLyric.showType
                    }
                    dispatch(receiveLyricFn(obj))
                }
            }
        }


    }

    handleEnded(){
        const {changeCurrentPlay,dispatch} = this.props;
        const currentPlayId = changeCurrentPlay.currentPlayId;
        const playlist = changeCurrentPlay.playlist || JSON.parse(window.localStorage.getItem('playlist'))
        for(var i = 0; i < playlist.length;i++){
            //alert(currentPlayId == playlist[i].id)
            if(currentPlayId == playlist[i].id){
                let playObj = {
                    ...changeCurrentPlay,
                    currentPlay:playlist[i+1],
                    currentPlayId:playlist[i+1].id
                }
                dispatch(fetchCurrentPlay(playObj))
                break;
            }
        }
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
                            <div className="cover-img"><img src={currentPlay.al.picUrl} /></div>
                            <div className="play-name">
                                <p className="top">{currentPlay.name}</p>
                                <p className="bottom">{currentPlay.ar[0].name}</p>
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
                        <audio onTimeUpdate={this.onTimeUpdate.bind(this)} onEnded={this.handleEnded} id="audio" src={changeCurrentPlay.mp3Url} >您的浏览器不支持 audio 标签。</audio>
                    </div>

                }




            </div>
        )
    }

}

export default PlayController