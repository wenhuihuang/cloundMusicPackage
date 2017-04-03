import React, { Component, PropTypes } from "react"
import { changeCurrentPlay } from '../../actions/playController'
import { Link } from 'react-router'

import PlayControllerStyle from './PlayController.scss'

class PlayController extends Component{

    componentDidUpdate () {
        const { currentPlay, isPlay } = this.props
        if(isPlay){
            let audio = document.getElementById('audio')
            audio.src=currentPlay.mp3Url
            audio.play()
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

    render(){
        const {currentPlay, isPlay} = this.props
        return (
            <div className="play-controller-wrap" >
                {
                    currentPlay &&

                    <div className="play-controller">
                        <Link to={"playViewPage/show"}>
                            <div className="cover-img"><img src={currentPlay.album.picUrl} /></div>
                            <div className="play-name">
                                <p>{currentPlay.name}</p>
                                <p>{currentPlay.artists[0].name}</p>
                            </div>
                        </Link>

                        <div className="play-btn" onClick={this.switchPlay.bind(this)}>
                            {
                                isPlay ? (<span className="icon iconfont">&#xe696;</span>) : (<span className="icon iconfont ">&#xe608;</span>)
                            }
                        </div>
                        <div className="play-list"><span className="icon iconfont">&#xe600;</span></div>
                    </div>
                }

                <audio id="audio" src="http://m2.music.126.net/TzB6EbAP_0q6HsIVG1Du3w==/1097312604528704.mp3" >您的浏览器不支持 audio 标签。</audio>


            </div>
        )
    }

}

export default PlayController