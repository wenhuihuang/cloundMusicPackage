import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPlaylistDetail } from '../../actions/index'
import { fetchCurrentPlay } from '../../actions/playController'
import ReactDOM from 'react-dom'
import PlaylistDetailPageStyle from './playlistDetailPage.scss'

class PlaylistDetailPage extends Component{

    static propTypes = {
        dispatch: PropTypes.func.isRequired
       // detail : PropTypes.object.isRequired
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
        const { dispatch } = this.props
        dispatch(fetchCurrentPlay(music_id))

    }

    render () {
        const { detail } = this.props
        console.log(detail)
        const isUndefined = detail == undefined ? true : false
        return(
            <div>
                { !isUndefined &&
                    <div className="playlist-detail">
                    <div className="playlist-info">
                        <div className="playlist-top-wrap">
                            <div className="playlist-top-bg" style={this.setStyles({background:'url('+detail.coverImgUrl+') no-repeat left top'})}></div>
                            <div className="playlist-top-content">
                                <div className="playlist-info-top">
                                    <div className="playlist-info-top-left">
                                        <div className="left-content">
                                            <img src={detail.coverImgUrl}/>
                                            <span> {
                                                ( count =>  (count+'').length > 5 ? (count+'').slice(0,-4)+'万' : count )(detail.playCount)
                                            } </span>
                                        </div>
                                    </div>
                                    <div className="playlist-info-top-right">
                                        <p>{detail.name}</p>
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
                                        <div className="playlist-no">{key}</div>
                                        <div className="playlist-music-info">
                                            <p className="name">{item.name}</p>
                                            <p className="artists-album">{item.artists[0].name} - {item.album.name}</p>
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
    const { receivePlaylistDetail } = state
    return{
        detail : receivePlaylistDetail.detail
    }
}



export default connect(mapStateToProps)(PlaylistDetailPage)