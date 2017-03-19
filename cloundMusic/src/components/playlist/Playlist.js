import React, { Component, PropTypes } from "react"
import { fetchMusicesList } from '../../actions/index'
import PlaylistStyle from './Playlist.scss'

class Playlist extends Component {

    static propTypes = {
        items : PropTypes.array.isRequired
    }

    componentDidMount() {

    }



    render() {
        const {
            items,
            onScroll
        } = this.props

        return (
            <ul className="public-clearfix list-wrapper" id="playlist" onScroll={() => onScroll()}>
                {
                    items.map( ( item, i ) =>
                        <li key={i} className="list-col">
                            <div className="list-media">
                                <img src={item.coverImgUrl} alt={item.name}/>
                                <span className="listen-count">
                            <i className="icon iconfont">&#xe652;</i>
                            <span>{item.subscribedCount}</span>
                        </span>
                                <p className="list-creator">
                                    <i className="icon iconfont">&#xe66b;</i>
                                    <span className="public-ellipsis">{item.creator.nickname}</span>
                                </p>
                            </div>
                            <div className="list-info">
                                <h3 className="list-name">{item.name}</h3>
                            </div>
                        </li>
                    )
                }

            </ul>
        )
    }
}



export default Playlist