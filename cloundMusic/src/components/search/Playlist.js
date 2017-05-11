import React, {Component} from 'react'

import './Playlist.scss'

class Playlist extends Component {


    render() {
        const {list} = this.props;
        return (
            <div>
                {
                    list.map((item,i)=>
                        <div key={i} className="search-list-special">
                            <div className="search-special-img">
                                <img src={item.coverImgUrl} />
                            </div>
                            <div className="search-special-right">
                                <div className="search-special-name">
                                    <span dangerouslySetInnerHTML={{__html:item.name}}></span>
                                </div>
                                <div className="search-special-singer">
                                    <span>{item.trackCount+"首"}</span>
                                    <span>{"by&nbsp:;"+item.creator.nickname}</span>
                                    <span>{"，播放"+item.playCount+"万次"}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Playlist