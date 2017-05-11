import React, {Component} from 'react'

import  './RadioList.scss'

class RadioList extends Component {


    render() {
        const {radioList,djprogramsList} = this.props;
        return (
            <div>
                <div>主播电台</div>
                {
                    radioList.map((item,i)=>
                        <div key={i} className="search-list-special">
                            <div className="search-special-img">
                                <img src={item.picUrl} />
                            </div>
                            <div className="search-special-right">
                                <div className="search-special-name">
                                    <span dangerouslySetInnerHTML={{__html:item.name}}></span>
                                </div>
                                <div className="search-special-singer">
                                    <span>{item.dj.nickname}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div>单期节目</div>
                {
                    djprogramsList.map((item,i)=>
                        <div key={i} className="search-list-special">
                            <div className="search-special-img">
                                <img src={item.coverUrl} />
                            </div>
                            <div className="search-special-right">
                                <div className="search-special-name">
                                    <span dangerouslySetInnerHTML={{__html:item.mainSong.name}}></span>
                                </div>
                                <div className="search-special-singer">
                                    <span>{item.dj.nickname+'-'}</span>
                                    <span>{"Vol."+item.serialNum}</span>
                                    <span>{"("+item.createTime+")"}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default RadioList