import React, { Component } from 'react'
import { connect } from 'react-redux'
import  utils  from '../../utils/utils'
import PlayViewPageStyle from './PlayViewPage.scss'
import { changeCurrentPlay as changeCurrentPlayFn,fetchCurrentPlay } from '../../actions/playController'
import { changeIsShowPlayView,receiveLyric as receiveLyricFn } from '../../actions/index'


class PlayViewPage extends Component{

    constructor(props){
        super(props)
        this.state = {y: 0};
        this.adjustProgress = this.adjustProgress.bind(this)
        this.adjustLyric=this.adjustLyric.bind(this)
        //this.switchMusic=this.switchMusic.bind(this)
    }

    componentDidMount(){


    }

    componentDidUpdate(){
        const me = this;
        const { isShowPlayView } = this.props;
        const audio = document.querySelector('#audio');
        if(isShowPlayView){ //显示
            var body = document.querySelector('body')
            body.style.overflow='hidden';

            if(audio){
                const currentLyric = document.querySelector('.currentLyric');
                audio.addEventListener('timeupdate',me.adjustLyric)
            }
        }else{ //隐藏
            var body = document.querySelector('body')
            body.style.overflow='auto';

            if(audio){

                audio.removeEventListener('timeupdate',me.adjustLyric)
            }
        }
    }

    adjustLyric(){
        const {receiveLyric} = this.props;
        const currentLyric = document.querySelector('.currentLyric'),
            lyricWrapper   = document.querySelector('.lyric-wrapper'),
            item = lyricWrapper&&lyricWrapper.querySelector('.item'),
            wrapper = document.querySelector('.disk-view-content-wrapper'),
            wrapperHeight = parseInt(getComputedStyle(wrapper).height);
        if(currentLyric && lyricWrapper){
            const offsetTop = currentLyric.offsetTop;

            if(offsetTop >= wrapperHeight/2){
                const y = (offsetTop-wrapperHeight/2)
                this.setState({
                    y: y
                })
                   // lyricWrapper.style.transform='translate3d(0,-'+y+'px,0)'
            }else if(receiveLyric.showType){
                this.setState({
                    y: 0
                })
                //lyricWrapper.style.transform='translate3d(0,0,0)'
            }
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

    back () {
        const {  dispatch } = this.props
        dispatch(changeIsShowPlayView(false))
    }

    /**
     *
     * -1：上一曲，1下一曲
     */
    switchMusic(flag){
        const {changeCurrentPlay,dispatch,receiveLyric} = this.props;
        const currentPlayId = changeCurrentPlay.currentPlayId;
        const playlist = changeCurrentPlay.playlist || JSON.parse(window.localStorage.getItem('playlist'))
        for(var i = 0; i < playlist.length;i++){
            if(currentPlayId == playlist[i].id){
                let playObj = {
                    ...changeCurrentPlay,
                    currentPlay:playlist[i+parseInt(flag)],
                    currentPlayId:playlist[i+parseInt(flag)].id
                }
                dispatch(fetchCurrentPlay(playObj))
                // let obj = {
                //     music_id:currentPlayId
                // };
                // dispatch(switchLyricFn(obj))
                break;
            }
        }

    }

    /**
     *  调节进度
     */
    adjustProgress(e){
        const { changeCurrentPlay } = this.props;
        let audio = document.querySelector('#audio');
        const duration = changeCurrentPlay.duration;
        const svg = document.querySelector('.progress-wrapper'),
            left = svg.offsetLeft,
            svg_width = parseInt(getComputedStyle(svg).width),
            dot = e.pageX - left,
            time = dot*duration/svg_width;
            audio.currentTime=time;
    }

    eachArray(arr) {
        let name = []
        if(arr.length<0)return;
        arr.forEach(function (item, i) {
            name.push(item.name)
        })
        return name.join('/');
    }

    /**
     * 歌词 图片切换
     */
    switchView(){
        const { dispatch,changeCurrentPlay,receiveLyric } = this.props;
        const currentPlayId = changeCurrentPlay.currentPlayId;
        let showType = receiveLyric.showType;
        let obj = {
            showType:!showType
        };
        dispatch(receiveLyricFn(obj))
    }

    render(){
        const { changeCurrentPlay ,isShowPlayView,receiveLyric} = this.props
        const currentPlay = changeCurrentPlay.currentPlay;
        const isPlay = changeCurrentPlay.isPlay,
            currentTime = changeCurrentPlay.currentTime || 0;
        let currentTimeStr = changeCurrentPlay.currentTimeStr,
            durationStr = changeCurrentPlay.durationStr;


        return(
            <div className={ isShowPlayView ? "playViewShow" : "playViewHide" }>
                {

                    <div className="play-view">
                        <div className="header">
                            <div className="header-back" onClick={this.back.bind(this)}>
                                <span className="iconfont icon">&#xe675;</span>
                            </div>
                            <div className="header-title">
                                <p>{currentPlay!=undefined&&currentPlay!=null&&currentPlay.name}</p>
                                <p>{
                                    currentPlay!=undefined&&currentPlay!=null&&
                                    this.eachArray(currentPlay.ar)
                                }</p>
                            </div>
                            <div className="header-right">

                            </div>
                        </div>
                        <div className="play-view-bg"  style={utils.setStyle({background:"url(http://p1.music.126.net/zXuNaT1llCWCeQi08y0Vcg==/18719185464749718.jpg) no-repeat left top"})}></div>
                        {/*碟区*/}
                        <div className="disk-view-content-wrapper" onClick={this.switchView.bind(this)}>
                                    <div className={receiveLyric.showType? "lyric-wrapper" : "lyric-wrapper public-hidden"} style={utils.setStyle({"transform":"translate3d(0px,-"+this.state.y+"px, 0px)","transition": "all .5s"})}>
                                        {
                                            receiveLyric.currentLyric&&receiveLyric.currentLyric.map((item,i)=>
                                                <p key={i} className={item.time==receiveLyric.currentLyricTime  ?"item currentLyric":"item"}>{item.text}</p>
                                            )
                                        }
                                    </div>
                                    <div className={receiveLyric.showType ? "disk-wrapper public-hidden":"disk-wrapper"} style={utils.setStyle({transform:'translate3d(0px, 0px, 0px)'})}>
                                        <div className={isPlay ? 'play-controller-icon-rotate' : 'play-controller-icon'}></div>
                                        <div className={isPlay ? 'disk-view-content-active' : 'disk-view-content'} >
                                            <img className="play-view-img" src={currentPlay&&currentPlay.al.picUrl} />
                                            <div className="disk-content-background"></div>
                                        </div>
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
                                    <span>
                                        {
                                            currentTimeStr
                                        }
                                    </span>
                                </div>
                                <div className="item progress-wrapper">
                                    {/*<span className="progress-icon"></span>*/}
                                    {/*<div className="progress-bar"></div>*/}

                                    <svg id="play-view-svg" width="100%" height="24px" xmlns="http://www.w3.org/2000/svg" version="1.1" onClick={this.adjustProgress}>
                                        <line x1="0" y1="12" x2="100%" y2="12" stroke="#D1D3D7"  strokeWidth="3"/>
                                        <line id="line" x1="0" y1="12" x2="100%" y2="12" stroke="rgb(255,0,0)" strokeWidth="3" strokeDasharray="0 100%" />
                                    </svg>

                                </div>
                                <div className="item all-time">
                                    <span>
                                        {
                                            durationStr
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="controller-bottom">
                                <div className="item">
                                    <span className="icon iconfont">&#xe63f;</span>
                                </div>
                                <div className="item">
                                    <span className="icon iconfont" onClick={this.switchMusic.bind(this,-1)}>&#xe6c9;</span>
                                </div>
                                <div className="item">

                                    {
                                        isPlay ? (<span className="icon iconfont" onClick={this.switchPlay.bind(this)}>&#xe696;</span>) : (<span className="icon iconfont " onClick={this.switchPlay.bind(this)}>&#xe601;</span>)
                                    }

                                    {/*<span className="icon iconfont"  onClick={this.switchPlay.bind(this)}>&#xe601;</span>*/}
                                </div>
                                <div className="item">
                                    <span className="icon iconfont" onClick={this.switchMusic.bind(this,1)}>&#xe6c8;</span>
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