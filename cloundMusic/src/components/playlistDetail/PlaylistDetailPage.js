import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPlaylistDetail,getMp3 } from '../../actions/index'
import { changeCurrentPlay,fetchCurrentPlay } from '../../actions/playController'
import {Link} from 'react-router'
import ReactDOM from 'react-dom'
import PlaylistDetailPageStyle from './playlistDetailPage.scss'

class PlaylistDetailPage extends Component{

    static propTypes = {
        dispatch: PropTypes.func.isRequired
       // detail : PropTypes.object.isRequired
    }

    constructor(props){
        super(props)
        this.state={opacity:0,title:false}
        this.handleScroll=this.handleScroll.bind(this)
    }

    componentWillMount () {
        const { dispatch } = this.props
        dispatch(fetchPlaylistDetail(this.props))

    }

    componentDidMount () {

    }

    setStyles (obj) {
        return Object.assign({},obj)
    }

    handleClick(mp3Url,music_id){
        const { dispatch,detail } = this.props
        let playObj = {
                isPlay:true,
                currentPlayId:music_id,
                playlist:detail.tracks
            }
            dispatch(fetchCurrentPlay(playObj))
        //dispatch(changeCurrentPlay(playObj))
       // dispatch(getMp3(music_id))

    }

    handleScroll(){
        const playlistName = document.querySelector('.info-right-name'),
            playlistDetail = document.querySelector('.playlist-detail')

        this.setState({
            opacity:playlistDetail.scrollTop/(playlistName.offsetTop + 50)
        })
        if(playlistDetail.scrollTop >= playlistName.offsetTop + 22){
            this.setState({
                title:true
            })
        }else{
            this.setState({
                title:false
            })
        }

    }

    back () {
        window.history.back();
    }

    render () {
        const { detail, currentPlay } = this.props
        const isUndefined = detail == undefined ? true : false
        return(
            <div className="playlist-detail-page">
                <div className="header">
                    <div className="header-bg" style={this.setStyles({"opacity":this.state.opacity})}></div>
                    <div className="header-back" onClick={this.back.bind(this)}>
                        <span className="iconfont icon">&#xe675;</span>
                    </div>
                    <div className="header-title">
                        {this.state.title?detail.name : "歌单"}
                    </div>
                    <div className="header-right">
                        <Link to={'/search'}><span className="icon iconfont">&#xe8e0;</span></Link>
                    </div>
                </div>
                { !isUndefined &&
                    <div className="playlist-detail"  onScroll={this.handleScroll}>
                    <div className="playlist-info">
                        <div className="playlist-top-wrap">

                            <div className="playlist-top-bg" style={this.setStyles({background:'url('+detail.coverImgUrl+') no-repeat left top'})}></div>
                            <div className="playlist-top-content">

                                <div className="playlist-info-top">
                                    <div className="playlist-info-top-left">
                                        <div className="left-content">
                                            <img src={detail.coverImgUrl}/>
                                            <span className="count"> {
                                                ( count =>  (count+'').length > 5 ? (count+'').slice(0,-4)+'万' : count )(detail.playCount)
                                            } </span>
                                        </div>
                                    </div>
                                    <div className="playlist-info-top-right">
                                        <p className="info-right-name">{detail.name}</p>
                                        <p>{detail.creator.nickname}</p>
                                    </div>
                                </div>
                                <div className="playlist-info-bottom">
                                    <div className="collect-btn">
                                        <span>{detail.subscribedCount}</span>
                                    </div>
                                    <div className="comment-btn">
                                        <span>{detail.commentCount}</span>
                                    </div>
                                    <div className="share-btn">
                                        <span>{detail.shareCount}</span>
                                    </div>
                                    <div className="download-btn">
                                        <span>下载</span>
                                    </div>
                                </div>
                                <div className="controler">
                                    <div className="play-all"></div>
                                    <div className="selected-all"></div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="playlist-item">
                        <ul>
                            {
                                detail.tracks.map((item, key) =>
                                    <li className="playlist-item-li" key={key} onClick={this.handleClick.bind(this,item.mp3Url,item.id)}>
                                        <div className="playlist-no">{(currentPlay && currentPlay['id']  == item['id']) ? (<span className="icon iconfont red-color">&#xe82f;</span>) : (key+1)}</div>
                                        <div className="playlist-music-info">
                                            <p className="name">{item.name}</p>
                                            <p className="artists-album">{
                                                item.ar.map((i,k)=>i.name)
                                            } - {item.al.name}</p>
                                        </div>
                                        <div className="playlist-more">

                                        </div>
                                    </li>
                                )
                            }
                        </ul>

                    </div>
                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    const { receivePlaylistDetail, changeCurrentPlay } = state
    return{
        detail : receivePlaylistDetail.detail,
        currentPlay : changeCurrentPlay.currentPlay,
        playlist: changeCurrentPlay.playlist
    }
}



export default connect(mapStateToProps)(PlaylistDetailPage)